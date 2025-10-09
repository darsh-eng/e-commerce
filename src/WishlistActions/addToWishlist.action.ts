"use server";

import { getMyToken } from "@/utilities/getMyToken";

export type AddToWishlistResponse = {
  status: string;
  message?: string;
  data?: unknown;
};

export async function addToWishlist(productId: string): Promise<AddToWishlistResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }
    return data;
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while adding to wishlist"
    );
  }
}


