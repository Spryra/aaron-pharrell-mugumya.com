export function middleware() {
  // Middleware is kept minimal to avoid Edge Runtime incompatibility with next-auth
  // Authentication checks are handled in route handlers and server components
}

export const config = {
  matcher: ['/admin/:path*'],
}
