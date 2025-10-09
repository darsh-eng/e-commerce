"use client";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema, RegisterSchemaType } from '@/schema/register.schema';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  async function handelRegister(values: RegisterSchemaType) {
    setIsLoading(true);
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      if (res.data.message === 'success') {
        toast.success("Registration successful!", {duration: 4000});
        form.reset();
        router.push('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message, {duration: 4000});
      } else {
        toast.error("An unexpected error occurred.", {duration: 4000});
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user-plus text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-600 mt-2">Join us today and start shopping</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handelRegister)} className="space-y-5">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3" 
                        placeholder="Enter your full name"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3" 
                        type="email" 
                        placeholder="Enter your email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3" 
                        type="tel" 
                        placeholder="Enter your phone number"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3" 
                        type="password" 
                        placeholder="Create a password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3" 
                        type="password" 
                        placeholder="Confirm your password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Register Button */}
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
