"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Order } from "@/types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import toast from "react-hot-toast";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = () => {
    api
      .get<{ orders: Order[] }>("/orders", { auth: true })
      .then((d) => setOrders(d.orders))
      .catch(() => toast.error("Failed to load orders"));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, orderStatus: string) => {
    try {
      await api.patch(`/orders/${id}/status`, { orderStatus }, { auth: true });
      toast.success("Order updated");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="bg-white rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o: any) => (
              <TableRow key={o._id}>
                <TableCell className="font-medium">{o.orderNumber}</TableCell>
                <TableCell>{o.user?.email || o.user?.name || "—"}</TableCell>
                <TableCell>${o.totalAmount?.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{o.paymentStatus}</TableCell>
                <TableCell>
                  <select
                    className="border rounded-md h-8 px-2 text-xs capitalize"
                    value={o.orderStatus}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                  No orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
