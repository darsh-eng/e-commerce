"use server";

import { getMyToken } from "@/utilities/getMyToken";

export type WishlistItem = {
  _id: string;
  title: string;
  imageCover?: string;
  price?: number;
  brand?: { name?: string };
};

export type GetWishlistResponse = {
  status: string;
  count?: number;
  data: WishlistItem[];
};

export async function getWishlist(): Promise<GetWishlistResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch wishlist");
    }
    return data;
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while fetching wishlist"
    );
  }
}


