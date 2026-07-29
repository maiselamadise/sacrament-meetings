'use client';

import { useState } from 'react';

export default function ProjectForm() {
  const [isPending, setIsPending] = useState(false);

  return (
    <form className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsPending(true)}
      >
        {isPending ? 'Saving...' : 'Save Project'}
      </button>
    </form>
  );
}
