import { OrderType, OrdersResponse } from "@/types/orders.t";

export default async function getAllOrders(): Promise<OrdersResponse> {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);
  const data = await response.json();
  return data;
}

export async function getOrderById(id: string): Promise<OrderType> {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${id}`);
  const data = await response.json();
  return data;
}

