import { getUserOrders } from '@/OrdersActions/getUserOrders.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { OrderType, CartItem } from '@/types/orders.t';
import React from 'react';

interface UserOrdersPageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserOrdersPage({ params }: UserOrdersPageProps) {
  const { userId } = await params;

  try {
    const orders: OrderType[] = await getUserOrders({ userId });

    if (!orders || orders.length === 0) {
      return (
        <div className="container mx-auto p-4">
          <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
            <h2 className="text-2xl font-bold">No orders found</h2>
            <p>This user hasn&apos;t placed any orders yet.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">User Orders</h1>

        <div className="grid grid-cols-1 gap-6">
          {orders.map((order: OrderType) => (
            <Card key={order.id} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-slate-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={order.isPaid ? 'default' : 'destructive'}>
                      {order.isPaid ? 'Paid' : 'Not Paid'}
                    </Badge>
                    <Badge variant={order.isDelivered ? 'default' : 'outline'}>
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">City:</span>{' '}
                      {order.shippingAddress?.city || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{' '}
                      {order.shippingAddress?.phone || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Details:</span>{' '}
                      {order.shippingAddress?.details || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-3">
                    {order.cartItems?.map((item: CartItem) => (
                      <div key={item._id} className="flex items-center gap-4 p-2 border rounded-md">
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
                          <h4 className="font-medium">{item.product?.title || 'Product'}</h4>
                          <div className="flex justify-between text-sm">
                            <span>Quantity: {item.count}</span>
                            <span className="font-medium">${item.price} each</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <span className="font-medium">Payment Method:</span> {order.paymentMethodType}
                  </div>
                  <div className="text-xl font-bold">Total: ${order.totalOrderPrice}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
          <p>Failed to load user orders. Please try again later.</p>
        </div>
      </div>
    );
  }
}
