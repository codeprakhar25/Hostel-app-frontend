import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./utils/isAuthenticated";

export const config = {
  matcher: ["/collect-rent/:id*", "/tenant/"]
}

const protectedRoutes = [
  '/:id/tenants',
  config,
  '/home/*',
  '/tenant/*',
  '/collect-rent/*',
  '/collect-rent/:id',
  '/'
]
export default function middleware(req: NextRequest) {
  if (
    isAuth && protectedRoutes.includes(req?.nextUrl?.pathname)
  ) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}


