"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { getMessages, markMessageRead, deleteMessage, type Message } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const messageResponse = await getMessages();
        setMessages(messageResponse);
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const handleMarkRead = async (id: number) => {
    try {
      const updated = await markMessageRead(id);
      setMessages((prev) => prev.map((message) => (message.id === updated.id ? updated : message)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Messages</p>
        <h2 className="text-3xl font-semibold">Customer inquiries</h2>
      </div>

      {messages.length === 0 ? (
        <AdminEmptyState
          title="No messages"
          message="Customer contact inquiries will appear here."
        />
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{message.email}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{message.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Received {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!message.is_read ? (
                    <Badge variant="secondary">Unread</Badge>
                  ) : (
                    <Badge variant="default">Read</Badge>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {message.message}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {!message.is_read ? (
                  <Button variant="outline" onClick={() => handleMarkRead(message.id)}>
                    Mark as read
                  </Button>
                ) : null}
                <Button variant="destructive" onClick={() => handleDelete(message.id)}>
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
