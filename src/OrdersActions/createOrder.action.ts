"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { CreateOrderRequest } from "@/types/orders.t";

export async function createOrder(orderData: CreateOrderRequest, cartId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    // Determine URL based on payment method (default is cash on delivery)
    const url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token, 
      },
      body: JSON.stringify(orderData), 
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    return data;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong while creating your order"
    );
  }
}

export async function createOrderWithCard(orderData: CreateOrderRequest, cartId: string, redirectUrl: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token, 
      },
      body: JSON.stringify({
        ...orderData,
        url: redirectUrl,
      }), 
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create payment session");
    }

    return data;
  } catch (error) {
    console.error("❌ Error creating payment session:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong while creating payment session"
    );
  }
}
