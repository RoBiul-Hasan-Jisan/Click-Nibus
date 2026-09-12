"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product, Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get<{ total: number }>("/products?limit=1").then((d) => setProductCount(d.total || 0)).catch(() => {});
    api.get<{ orders: Order[] }>("/orders", { auth: true }).then((d) => setOrders(d.orders || [])).catch(() => {});
  }, []);

  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { title: "Products", value: productCount, icon: Package },
    { title: "Orders", value: orders.length, icon: ShoppingCart },
    { title: "Revenue (paid)", value: `$${revenue.toFixed(2)}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="w-4 h-4 text-shop_dark_green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
