import { Order } from "@/types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Date:</strong> {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Payment status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">{order.paymentStatus}</span>
          </p>
          <p>
            <strong>Order status:</strong> <span className="capitalize font-medium">{order.orderStatus}</span>
          </p>
          {order.shippingAddress && (
            <p>
              <strong>Ship to:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.addressLine},{" "}
              {order.shippingAddress.city} {order.shippingAddress.zip}
            </p>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {item?.image && <Image src={item.image} alt="productImage" width={50} height={50} className="border rounded-sm" />}
                  {item?.name}
                </TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter amount={item?.price} className="text-black font-medium" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
              <strong>Total: </strong>
              <PriceFormatter amount={order?.totalAmount} className="text-black font-bold" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
