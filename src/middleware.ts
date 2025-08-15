import NextAuth from "next-auth";
import { authConfig } from "./utils/config";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./utils/auth";

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest)
{
    const {pathname} = request.nextUrl;
    const session = await auth()

    console.log(pathname)

    if(pathname !== '/auth/login' && session?.refreshToken == null)
    {
        return NextResponse.redirect(new URL('/auth/login',request.url))
    }
}

export const config = {
  matcher: ["/"],
};