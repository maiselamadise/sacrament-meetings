// components/login-form.tsx
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <button
        aria-disabled={isPending}
        type="submit"
        className="inline-flex w-full justify-center rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>

      {errorMessage && (
        <p role="alert" className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </p>
      )}
    </form>
  );
}