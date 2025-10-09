"use client";

import { addToWishlist } from "@/WishlistActions/addToWishlist.action";
import { useSession } from "next-auth/react";
import { useTransition, useState } from "react";
import { toast } from "sonner";

export default function WishlistButton({ productId, size = 20 }: { productId: string; size?: number }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const onClick = () => {
    if (!session) {
      toast.error("Please login to use wishlist");
      return;
    }
    startTransition(async () => {
      try {
        await addToWishlist(productId);
        setAdded(true);
        toast.success("Added to wishlist");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to add to wishlist";
        toast.error("Failed to add to wishlist", { description: message });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add to wishlist"
      disabled={isPending}
      className={`rounded-full cursor-pointer p-2 transition-colors ${added ? "text-red-600" : "text-gray-500 hover:text-red-600"}`}
      title={added ? "Added" : "Add to wishlist"}
    >
      <i className={`${added ? "fas" : "far"} fa-heart`} style={{ fontSize: size }}></i>
    </button>
  );
}


