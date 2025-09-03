import { NextRequest, NextResponse } from "next/server";
import { API_AUTH_URL } from "../constants";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Auth routes that should redirect authenticated users
const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// Public routes that don't require authentication
const publicRoutes = ["/", "/about", "/contact"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by verifying session
  const isAuthenticated = await checkAuthentication(request);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // redirect authenticated users to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      const returnTo = request.nextUrl.searchParams.get("returnTo");
      const redirectUrl = new URL(returnTo || "/dashboard", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

async function checkAuthentication(request: NextRequest): Promise<boolean> {
  try {
    const baseURL = API_AUTH_URL;

    // Check session with native fetch
    const response = await fetch(`${baseURL}/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data?.session?.user;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
