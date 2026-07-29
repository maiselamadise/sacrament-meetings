import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Meeting not found</h2>
      <p className="mt-2 text-slate-600">The meeting you want to edit no longer exists.</p>
      <Link href="/meetings" className="mt-4 inline-flex rounded-md bg-sky-800 px-3 py-2 font-semibold text-white">
        Back to meetings
      </Link>
    </div>
  );
}
