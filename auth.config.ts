// auth.config.ts  (project root)
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // use your own login page instead of the Auth.js default
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedStaticPaths = ['/dashboard', '/projects/create', '/meetings/new'];
      const protectedEditPath = /^\/(?:meetings|projects)\/[^/]+\/edit$/;

      const isProtected =
        protectedStaticPaths.some((path) => nextUrl.pathname.startsWith(path)) ||
        protectedEditPath.test(nextUrl.pathname);

      if (isProtected) {
        return isLoggedIn;
      }

      // Redirect already-logged-in users away from the login page
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;