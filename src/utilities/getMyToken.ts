'use server';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getMyToken() {
  try {
    let decodedToken =
      (await cookies()).get(`next-auth.session-token`)?.value ||
      (await cookies()).get(`__Secure-next-auth.session-token`)?.value;
    if (!decodedToken) return null;
    let token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! });
    
    return token?.token || null;
  } catch {
    return null;
  }
}
