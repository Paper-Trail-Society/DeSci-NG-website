import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/upload-paper"];

// Auth routes that should redirect authenticated users away
const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check for better-auth session cookie (optimistic check)
  // Default cookie name format: {prefix}.{cookie_name}
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionCookie;

  // Protect authenticated routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Avoid redirect loops by checking if we're already going to login
      if (pathname === "/login") {
        return NextResponse.next();
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname === route)) {
    if (isAuthenticated) {
      // Avoid redirect loops by checking if we're already going to dashboard
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.next();
      }

      const returnTo = request.nextUrl.searchParams.get("returnTo");
      const redirectUrl = new URL(returnTo || "/dashboard", request.url);

      // Prevent redirect loops by ensuring we're not redirecting to the same path
      if (redirectUrl.pathname === pathname) {
        return NextResponse.next();
      }

      return NextResponse.redirect(redirectUrl);
    }
  }

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
     * - assets (public assets)
     * - Any file with an extension
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.).*)",
  ],
};
