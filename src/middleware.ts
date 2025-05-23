import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/projects(.*)',
  '/settings(.*)',
  '/api/projects(.*)',
  '/api/seed(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  // Debug logging (remove in production)
  console.log(`[Middleware] Path: ${pathname}, UserId: ${userId ? 'authenticated' : 'unauthenticated'}`)

  // If user is NOT authenticated and trying to access a protected route
  if (!userId && isProtectedRoute(req)) {
    console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to /sign-in`)
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // If user is authenticated and trying to access sign-in/sign-up pages
  if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
    console.log(`[Middleware] Redirecting authenticated user from ${pathname} to /dashboard`)
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow authenticated users to access the homepage (marketing page)
  // Removed automatic redirect to dashboard

  // Allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}