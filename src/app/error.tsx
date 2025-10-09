"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import err from "../../public/images/404.jpg";

export default function ErrorPage() {
  return (
    <div className="relative h-screen w-screen">
      
      <Image
        src={err}
        alt="Error"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          Something went wrong!
        </h1>

        <p className="text-gray-200 mb-6">
          An unexpected error has occurred. Please try again later.
        </p>

        <Link href="/" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-700 cursor-pointer text-white transition-all rounded-xl">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
