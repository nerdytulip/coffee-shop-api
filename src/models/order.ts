export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";
