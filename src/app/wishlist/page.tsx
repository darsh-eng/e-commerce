"use client";

import { useEffect, useState, useTransition } from "react";
import { getWishlist } from "@/WishlistActions/getWishlist.action";
import { addToWishlist } from "@/WishlistActions/addToWishlist.action";
import { removeFromWishlist } from "@/WishlistActions/removeFromWishlist.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

type WishlistItem = {
  _id: string;
  title: string;
  imageCover?: string;
  price?: number;
  brand?: { name?: string };
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState("");
  const [isPending, startTransition] = useTransition();

  const refresh = async () => {
    try {
      const res = await getWishlist();
      setItems(res.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load wishlist";
      setError(message);
      toast.error("Failed to load wishlist", { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAdd = async () => {
    if (!productId.trim()) {
      toast.error("Please enter a product ID");
      return;
    }
    startTransition(async () => {
      try {
        await addToWishlist(productId.trim());
        toast.success("Added to wishlist");
        setProductId("");
        await refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to add item";
        toast.error("Failed to add item", { description: message });
      }
    });
  };

  const handleRemove = async (id: string) => {
    startTransition(async () => {
      try {
        await removeFromWishlist(id);
        toast.success("Removed from wishlist");
        await refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to remove item";
        toast.error("Failed to remove item", { description: message });
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-2 text-lg text-gray-600">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <div className="text-red-600 text-5xl mb-4">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-700">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        {items.length > 0 && (
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              // bulk remove by calling removeFromWishlist sequentially
              const ids = items.map((i) => i._id);
              startTransition(async () => {
                try {
                  for (const id of ids) {
                    await removeFromWishlist(id);
                  }
                  toast.success("Wishlist cleared");
                  await refresh();
                } catch (err) {
                  const message = err instanceof Error ? err.message : "Failed to clear wishlist";
                  toast.error("Failed to clear wishlist", { description: message });
                }
              });
            }}
            disabled={isPending}
          >
            Clear All
          </Button>
        )}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Product to Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={handleAdd} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-gray-400 text-5xl mb-4">
            <i className="fas fa-heart-broken"></i>
          </div>
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {items.map((item) => (
            <Card key={item._id} className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <Button variant="destructive" className="cursor-pointer" onClick={() => handleRemove(item._id)} disabled={isPending}>
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {item.imageCover && (
                    <div className="w-20 h-20 relative">
                      <Image
                        src={item.imageCover}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    <p>Brand: {item.brand?.name || "-"}</p>
                    {item.price != null && <p>Price: {item.price} EGP</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


