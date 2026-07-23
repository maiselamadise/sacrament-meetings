import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid items-center gap-10 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-16">
      <div>
        <p className="eyebrow">Springfield Ward</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Sunday Welcoming Program.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          View current and past sacrament meeting agendas, including hymns,
          prayers, ward business, and speakers.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="button-primary" href="/meetings/current">
            View this Sunday&apos;s program
          </Link>
          <Link className="button-secondary" href="/meetings">
            Browse all meetings
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-sky-100 bg-sky-50 p-10 text-center shadow-sm">
        <Image
          src="/springfield-chapel.webp"
          alt="Springfield Ward chapel"
          width={700}
          height={500}
          priority
          className="h-full w-full object-cover"
        />
        <p className="mt-6 font-heading text-xl font-semibold text-slate-800">
          Meeting programs in one place
        </p>
      </div>
    </section>
  );
}
