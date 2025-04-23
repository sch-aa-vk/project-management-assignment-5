export enum OrderStatus {
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export interface IOrder {
  order_id: string;
  customer_id: string;
  order_date: Date;
  amount: number;
  status: OrderStatus;
}
