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
  
  // Check for auth marker (for cross-domain cookie support)
  const auth_marker = req.cookies.get("cf_auth")?.value;

  // Log all cookies for debugging (Vercel logs এ দেখাবে)
  const allCookies = req.cookies.getAll();
  console.log("🔐 Middleware Debug:", {
    pathname,
    hasToken: !!access_token,
    hasAuthMarker: !!auth_marker,
    tokenPreview: access_token ? access_token.substring(0, 20) + "..." : "none",
    allCookies: allCookies.map((c) => ({ name: c.name, hasValue: !!c.value })),
    origin: req.headers.get("origin"),
    host: req.headers.get("host"),
  });
  
  const isAuthenticated = !!(access_token || auth_marker);

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    // Redirect logged-in users away from auth pages
    if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
      console.log("🔄 Redirecting to /classroom");
      return NextResponse.redirect(new URL("/classroom", req.url));
    }
    return NextResponse.next();
  }

  // Block protected routes without token
  if (!isAuthenticated) {
    console.log("🚫 No token found, redirecting to /auth/sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Allow access to protected routes with token
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
