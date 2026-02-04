import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const AUTH_ROUTES = ["/auth/sign-in", "/auth/sign-up"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const access_token = req.cookies.get("access_token")?.value;

  console.log("🔐 Middleware:", {
    pathname,
    hasToken: !!access_token,
  });

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    // Redirect logged-in users away from auth pages
    if (access_token && AUTH_ROUTES.includes(pathname)) {
      console.log("🔄 Redirecting to /classroom");
      return NextResponse.redirect(new URL("/classroom", req.url));
    }
    return NextResponse.next();
  }

  // Block protected routes without token
  if (!access_token) {
    console.log("🚫 Redirecting to /auth/sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Allow access to protected routes with token
  console.log("✅ Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
