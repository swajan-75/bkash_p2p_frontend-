import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const publicRoutes = ["/login", "/about", "/comingsoon"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/transactions", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
