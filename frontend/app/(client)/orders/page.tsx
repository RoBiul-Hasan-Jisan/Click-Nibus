"use client";

import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import NoAccess from "@/components/NoAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Order } from "@/types";
import { FileX, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!firebaseUser) return;
    api
      .get<{ orders: Order[] }>("/orders/mine", { auth: true })
      .then((d) => setOrders(d.orders))
      .catch(() => setOrders([]));
  }, [firebaseUser]);

  if (authLoading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-shop_dark_green" />
      </div>
    );
  }

  if (!firebaseUser) return <NoAccess details="Log in to view your orders." />;

  return (
    <div>
      <Container className="py-10">
        {orders === null ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-shop_dark_green" />
          </div>
        ) : orders.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px] md:w-auto">Order Number</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">No orders found</h2>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Browse Products</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
