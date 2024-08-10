import { NextRequest, NextResponse } from "next/server";

const publicPrefixes = ["/workspace"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get(process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!) ??
    undefined;

  if (!token && publicPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
