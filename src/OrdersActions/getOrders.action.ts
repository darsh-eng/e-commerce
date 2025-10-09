"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { OrdersResponse } from "@/types/orders.t";

export async function getOrders(): Promise<OrdersResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
  } catch (error) {
    console.error("❌ Error while fetching orders:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching orders"
    );
  }
}
