"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { getOrders, updateOrderStatus, type Order } from "@/lib/api";
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

const statusOptions = ["Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled"];

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const orderResponse = await getOrders();
        setOrders(orderResponse);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const query = search.toLowerCase();
        return (
          order.order_number.toLowerCase().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.phone.toLowerCase().includes(query) ||
          order.pickup_location.toLowerCase().includes(query)
        );
      }),
    [orders, search],
  );

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
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
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Orders</p>
        <h2 className="text-3xl font-semibold">Customer orders</h2>
      </div>

      <AdminSearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by order, customer, phone or pickup"
      />

      {filteredOrders.length === 0 ? (
        <AdminEmptyState
          title="No orders found"
          message="Orders will appear here once customers complete checkout."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.order_number}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.pickup_location}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell className="space-y-2">
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateStatus(order.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={order.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {order.status === "Completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                    ) : null}
                    {order.status === "Pending" ? <Clock3 className="h-4 w-4 text-gold" /> : null}
                    {order.status === "Cancelled" ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : null}
                    <span>{order.payment_status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
