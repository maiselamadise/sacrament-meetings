import Link from "next/link";

export default function MeetingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <nav aria-label="Meetings navigation" className="meetings-navigation mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-5">
        <Link className="button-secondary" href="/meetings">All meetings</Link>
        <Link className="button-secondary" href="/meetings/current">Current program</Link>
      </nav>
      {children}
    </section>
  );
}
