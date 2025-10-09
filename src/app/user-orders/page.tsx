"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createOrderWithCard } from "@/OrdersActions/createOrder.action";
import { getCart } from "@/CartActions/getCart.action";
import { toast } from "sonner";

export default function UserOrdersHomePage() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartSummary, setCartSummary] = useState<{ items: number; total: number }>({ items: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        if (cart && cart.data && cart.data._id) {
          setCartId(cart.data._id);
          setCartSummary({ items: cart.numOfCartItems || 0, total: cart.data.totalCartPrice || 0 });
        } else {
          setCartId(null);
        }
      } catch  {
        setCartId(null);
      } finally {
        setLoadingCart(false);
      }
    };
    fetchCart();
  }, []);

  const handleCheckoutSession = async () => {
    setLoading(true);
    try {
      const orderData = {
        shippingAddress: {
          details: "details",
          phone: "01010700999",
          city: "Cairo",
        },
      };

      if (!cartId) {
        toast.error("No active cart found. Please add products first.");
        setLoading(false);
        return;
      }

      const response = await createOrderWithCard(orderData, cartId, window.location.origin);

      if (response && response.session && response.session.url) {
        toast.success("Checkout session created successfully. Redirecting...");
        window.location.href = response.session.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("An error occurred while creating the checkout session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create Checkout Session</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Link href="/orders">
            <Button className="bg-slate-900 text-white transition-all  hover:bg-white hover:text-slate-900 cursor-pointer" variant="outline">All Orders</Button>
          </Link>
          <Link href="/orders/user">
            <Button className="bg-white text-slate-900  transition-all hover:bg-slate-900 hover:text-white cursor-pointer" variant="outline">My Orders</Button>
          </Link>
        </div>
      </div>

      <Card className="max-w-md my-12 p-6 mx-auto">
        <CardHeader>
          <CardTitle>Pay with Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loadingCart ? (
              <div className="text-gray-600">Loading cart data...</div>
            ) : !cartId ? (
              <div className="text-red-600">No active cart found. Add products to start checkout.</div>
            ) : (
              <div className="rounded-md border p-3 text-sm text-gray-700">
                <div>Items: {cartSummary.items}</div>
                <div>Total: {cartSummary.total} EGP</div>
              </div>
            )}
            <Button
              onClick={handleCheckoutSession}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading || loadingCart || !cartId}
            >
              {loading ? "Processing..." : "Checkout Now"}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Default shipping data will be used (Cairo, 01010700999)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
