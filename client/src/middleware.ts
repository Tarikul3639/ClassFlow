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
  
  // Check for auth marker cookie (set from client-side after successful auth)
  const auth_marker = req.cookies.get("cf_auth")?.value;

  console.log("🔐 Middleware Debug:", {
    pathname,
    hasAuthMarker: !!auth_marker,
    origin: req.headers.get("origin"),
    host: req.headers.get("host"),
  });
  
  const isAuthenticated = !!auth_marker;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    // Redirect logged-in users away from auth pages
    if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
      console.log("🔄 Redirecting to /classroom");
      return NextResponse.redirect(new URL("/classroom", req.url));
    }
    return NextResponse.next();
  }

  // Block protected routes without auth marker
  if (!isAuthenticated) {
    console.log("🚫 No auth marker found, redirecting to /auth/sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Allow access to protected routes with auth marker
  console.log("✅ Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js, workbox-*.js (service worker files)
     * - manifest.json (PWA manifest)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw\\.js|workbox-.*\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
