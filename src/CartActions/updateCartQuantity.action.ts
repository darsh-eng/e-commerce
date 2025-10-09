"use server"

import { getMyToken } from "@/utilities/getMyToken";

export async function updateCartQuantity(id: string, count: number) {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");  
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token
        },
        body: JSON.stringify({ count })
    });
    const payload = await res.json();
    return payload;
}