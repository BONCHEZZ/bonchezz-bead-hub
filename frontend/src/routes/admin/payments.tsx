"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { getPayments, getOrders, type Order, type Payment } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusOptions = ["Paid", "Pending", "Failed", "Cancelled"];

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
});

function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const orderMap = useMemo(() => {
    const map = new Map<number, Order>();
    orders.forEach((order) => map.set(order.id, order));
    return map;
  }, [orders]);

  useEffect(() => {
    async function load() {
      try {
        const [paymentResponse, orderResponse] = await Promise.all([getPayments(), getOrders()]);
        setPayments(paymentResponse.results);
        setOrders(orderResponse);
      } catch {
        setPayments([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const order = orderMap.get(payment.order);
      const query = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        String(payment.order).includes(query) ||
        payment.payment_method.toLowerCase().includes(query) ||
        payment.status.toLowerCase().includes(query) ||
        (order?.order_number ?? "").toLowerCase().includes(query) ||
        (order?.customer_name ?? "").toLowerCase().includes(query);
      const matchesStatus = statusFilter ? payment.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter, orderMap]);

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Payments</p>
        <h2 className="text-3xl font-semibold">Payment records</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminSearchBar value={search} onChange={setSearch} placeholder="Search payments" />
        <div className="max-w-xs">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <AdminEmptyState
          title="No payments found"
          message="Payment records will appear here once orders are placed."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => {
              const order = orderMap.get(payment.order);
              return (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    #{order?.order_number ?? payment.order}
                  </TableCell>
                  <TableCell>{order?.customer_name ?? "—"}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.payment_method}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "Paid"
                          ? "secondary"
                          : payment.status === "Pending"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
