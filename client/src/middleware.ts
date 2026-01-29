// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up", "/forgot-password"];

export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow public routes
//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // token check (cookie recommended)
//   const token = req.cookies.get("token")?.value;

//   console.log("Middleware check for path:", pathname, "Token:", token);

//   // If not logged in → home page
//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   // If logged in → allow
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
};
