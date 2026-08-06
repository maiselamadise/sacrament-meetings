// auth.ts  (project root)
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByEmail } from '@/lib/data'; // your DB query function

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? process.env.BETTER_AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          console.log('[auth][debug] authorize parsed.success:', parsed.success);
          if (!parsed.success) {
            console.log('[auth][debug] authorize parse error:', parsed.error?.format?.());
            return null;
          }

          const { email, password } = parsed.data;
          console.log('[auth][debug] authorize for email:', email, 'password length:', password.length);
          const user = await getUserByEmail(email);
          console.log('[auth][debug] user exists:', !!user);
          if (!user) return null;

          console.log('[auth][debug] stored hash length:', String(user.passwordHash).length);
          const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
          console.log('[auth][debug] password compare result:', passwordsMatch);
          if (passwordsMatch) return user;

          return null;
      },
    }),
  ],
});