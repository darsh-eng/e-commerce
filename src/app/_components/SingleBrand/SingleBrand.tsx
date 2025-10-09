import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { BrandType } from '@/types/brand.t';
export default function SingleBrand({ brand }: { brand: BrandType }) {
  return (
    <>
      <div className=" w-full md:w-1/2 lg:w-1/4 xl:w-1/5 ">
        <div className="prod p-4">
          <Card className="gap-2 rounded-full hover:shadow-lg cursor-pointer">
            <Link href={`/brands/${brand._id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={500}
                    height={500}
                    className="rounded-full"
                  />
                </CardTitle>
              </CardHeader>

            </Link>
            
          </Card>
          <div className="text-center mt-2 font-bold text-gray-800">{brand.name}</div>
        </div>
      </div>
    </>
  );
}
