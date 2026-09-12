export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPercent?: number;
  stock: number;
  images: string[];
  category?: Category;
  brand?: Brand;
  isFeatured?: boolean;
  status?: "new" | "hot" | "sale" | "";
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: Address;
  paymentMethod: "stripe" | "cod";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export type UserRole = "admin" | "user";

export interface AppUser {
  _id: string;
  firebaseUid: string;
  email: string;
  name?: string;
  role: UserRole;
}
