// middleware.ts  (project root)
export { auth as middleware } from './auth';

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};