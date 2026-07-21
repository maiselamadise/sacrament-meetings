export default function Loading() {
  return (
    <div aria-live="polite" className="space-y-4">
      <p className="sr-only">Loading meeting information</p>
      <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
      <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
      <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}
