"use server";
import { getMyToken } from '@/utilities/getMyToken';  

export async function getLoggedInUser() {
    let token = await getMyToken()
    if(!token){
        throw new Error("User not logged in")
    }

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'GET',
        headers: {
            token,
            "Content-Type": "application/json"
        }
    });

    let payload = await res.json();
    return payload;
}

// Add this function to maintain compatibility with both function names
export async function getCart() {
    return getLoggedInUser();
}