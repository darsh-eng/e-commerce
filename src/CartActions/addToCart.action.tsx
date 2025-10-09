"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const payload = await res.json();

  if (res.ok) {
    return payload;
  } else {
    throw new Error(payload.message);
  }
}
