"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/OrdersActions/createOrder.action";
import { getCart } from "@/CartActions/getCart.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Link from "next/link";

export default function CreateOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalPrice: 0,
  });
  const [formData, setFormData] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        if (cartData && cartData.data) {
          setCartId(cartData.data._id);
          setCartSummary({
            totalItems: cartData.numOfCartItems || 0,
            totalPrice: cartData.data.totalCartPrice || 0,
          });
        }
      } catch {
        toast.error("Error loading cart data", {
          description: "Please make sure you have products in your cart before creating an order",
        });
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cartId) {
      toast.error("Cannot create order", {
        description: "No products in cart or error loading cart data",
      });
      return;
    }
    
    setLoading(true);

    try {
      await createOrder({ shippingAddress: formData }, cartId);

      toast.success("Order Created Successfully 🎉", {
        description: "Your order has been placed and will be processed soon.",
      });

      router.push("/orders");
      router.refresh();
    } catch (err) {
      toast.error("Error", {
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong while creating your order.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loadingCart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-2 text-lg text-gray-600">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading cart data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!cartId || cartSummary.totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create New Order</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="text-gray-400 text-5xl mb-4">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <p className="text-gray-600 mb-6">No products in your cart. Please add products before creating an order.</p>
            <Link href="/">
              <Button className="bg-blue-600 cursor-pointer  hover:bg-blue-700">
                Browse Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
          <CardTitle className="text-2xl text-center text-blue-800">
            <i className="fas fa-clipboard-list mr-2"></i>
            Create New Order
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2 text-blue-700">Cart Summary</h3>
            <div className="flex justify-between items-center">
              <span>Number of Products:</span>
              <span className="font-bold">{cartSummary.totalItems}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Total:</span>
              <span className="font-bold text-green-600">{cartSummary.totalPrice} EGP</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="city" className="text-gray-700">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="details" className="text-gray-700">Address Details</Label>
                <Input
                  id="details"
                  name="details"
                  type="text"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address details"
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <Label className="text-gray-700 mb-2 block">Payment Method</Label>
                <RadioGroup defaultValue="cash" value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">Credit Card</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <CardFooter className="px-0 pt-4 flex gap-4">
              <Button 
                type="submit" 
                disabled={loading} 
                className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </div>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    Create Order
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 cursor-pointer"
              >
                <i className="fas fa-times mr-2"></i>
                Cancel
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
