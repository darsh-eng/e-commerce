"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function removeItemFromCart(id: string) {
    const token = await getMyToken();
    if (!token) throw new Error("User is not authenticated");
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    });
    const payload = await res.json();
    return payload;
}
