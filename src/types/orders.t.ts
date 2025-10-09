export interface OrderType {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: string;
  paidAt?: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: {
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
  price: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CreateOrderRequest {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
}

export interface OrdersResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  data: OrderType[];
}

