'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2">{error.message || 'We could not load this meeting page right now.'}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-slate-900 px-3 py-2 font-semibold text-white"
        >
          Try again
        </button>
        <Link href="/meetings" className="rounded-md border border-slate-300 px-3 py-2 font-semibold text-slate-700">
          Back to meetings
        </Link>
      </div>
    </div>
  );
}
