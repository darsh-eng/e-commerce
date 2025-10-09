import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/types/products.t';
import AddBtn from './AddBtn/AddBtn';
import WishlistButton from './WishlistButton';
export default function SingleProduct({ product } : {product:ProductType}) {
  return (
    <>
      <div className=" w-full md:w-1/2 lg:w-1/4 xl:w-1/5 ">
        <div className="prod p-4">
          <Card className="gap-2   cursor-pointer relative">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image src={product.imageCover} alt={product.title}  width={500} height={500} />
                </CardTitle>
                <CardDescription className="text-amber-600">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="line-clamp-1  text-semibold">{product.title}</CardContent>
              <CardFooter className="flex justify-between">
                <div>{product.price} EGP</div>
                <div>
                  <i className="fas fa-star text-amber-600"></i> {product.ratingsAverage}{' '}
                </div>
              </CardFooter>
            </Link>
              <div className="flex items-center justify-between px-4 pb-4">
                <AddBtn id={product.id} />
                <WishlistButton productId={product.id} />
              </div>
          </Card>
        </div>
      </div>
    </>
  );
}
