"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to remove item from wishlist");
    }
    return data;
  } catch (error) {
    console.error("❌ Error removing item from wishlist:", error);
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while removing wishlist item"
    );
  }
}


