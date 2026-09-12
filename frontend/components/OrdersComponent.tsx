"use client";

import { Order } from "@/types";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import { format } from "date-fns";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";

const OrdersComponent = ({ orders }: { orders: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order?.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-gray-100 h-12" onClick={() => setSelectedOrder(order)}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.createdAt && format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter amount={order?.totalAmount} className="text-black font-medium" />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize hidden sm:table-cell">{order.orderStatus}</TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrdersComponent;
