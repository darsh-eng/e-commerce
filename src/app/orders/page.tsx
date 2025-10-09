"use client";

import { useEffect, useState } from 'react';
import { OrderType } from '@/types/orders.t';
import { getOrders } from '@/OrdersActions/getOrders.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
        toast.success('Orders loaded successfully');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An error occurred while loading orders.';
        setError(message);
        toast.error('Failed to load orders', { description: message });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
          <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Orders</h1>
        <div className="flex gap-3">
          <Link href="/orders/user">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">My Orders</Button>
          </Link>
          <Link href="/user-orders">
            <Button className="bg-white text-slate-900 border hover:bg-slate-50 cursor-pointer">Checkout Page</Button>
          </Link>
          <Link href="/create-order">
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              <i className="fas fa-plus mr-2"></i>
              Create New Order
            </Button>
          </Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-gray-400 text-5xl mb-4">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <p className="text-gray-500 text-lg mb-4">No orders found</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={order.isPaid ? 'default' : 'secondary'} className="px-3 py-1">
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </Badge>
                    <Badge
                      variant={order.isDelivered ? 'default' : 'outline'}
                      className="px-3 py-1"
                    >
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Order Date:{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center text-blue-700">
                      <i className="fas fa-user mr-2"></i>
                      User Information
                    </h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <span className="font-semibold">Name:</span> {order.user.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span> {order.user.email}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {order.user.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center text-purple-700">
                      <i className="fas fa-shipping-fast mr-2"></i>
                      Shipping Information
                    </h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      {order.shippingAddress ? (
                        <>
                          <p>
                            <span className="font-semibold">City:</span>{' '}
                            {order.shippingAddress.city}
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span>{' '}
                            {order.shippingAddress.phone}
                          </p>
                          <p>
                            <span className="font-semibold">Details:</span>{' '}
                            {order.shippingAddress.details}
                          </p>
                        </>
                      ) : (
                        <p>No shipping information available</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center text-green-700">
                      <i className="fas fa-info-circle mr-2"></i>
                      Order Details
                    </h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="flex items-center justify-between">
                        <span className="font-semibold">Payment Method:</span>
                        <span>
                          {order.paymentMethodType === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-green-600">
                          {order.totalOrderPrice} EGP
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="font-semibold">Shipping:</span>
                        <span>{order.shippingPrice} EGP</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="font-semibold">Tax:</span>
                        <span>{order.taxPrice} EGP</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <i className="fas fa-box mr-2"></i>
                    Products
                  </h3>
                  <div className="space-y-3">
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          {item.product?.imageCover && (
                            <div className="w-16 h-16 relative">
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                fill
                                sizes="64px"
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product?.title}</h4>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Quantity: {item.count}</span>
                            <span className="font-medium">{item.price} EGP</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No products in this order</p>
                    )}
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
