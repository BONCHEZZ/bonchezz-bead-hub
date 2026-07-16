import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Music2, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";
import { sendMessage } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bonchezz Bead Hub" },
      {
        name: "description",
        content: "Talk to Bonchezz: WhatsApp, Instagram, email or the contact form.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await sendMessage({ name, email, message });
      if (response) {
        setSent(true);
        toast.success("Message sent! We'll reply within 24 hours.");
        form.reset();
      }
    } catch {
      setError("Could not send message. Please try again later.");
    }
  };
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Say hi</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Custom orders, wholesale, or just vibes — we're here for it.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-4">
          <ContactRow icon={Phone} label="Call us" value="+254705990086" />
          <ContactRow icon={Mail} label="Email" value="derrickbonche9@gmail.com" />
          <a
            href="https://wa.me/254705990086"
            className="flex items-center gap-4 rounded-3xl bg-gradient-brand p-5 text-primary-foreground shadow-soft hover:shadow-glow transition"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-background/20">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide opacity-80">Fastest reply</div>
              <div className="font-display text-xl font-semibold">Chat on WhatsApp</div>
            </div>
          </a>
          <div className="flex gap-3 pt-2">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-pink hover:text-pink-foreground transition"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-foreground hover:text-background transition"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4"
        >
          <h2 className="font-display text-2xl font-semibold">Send a message</h2>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Name
            </span>
            <input
              name="name"
              required
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 resize-none"
            />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-purple disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            Send message
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-purple">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-display text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
