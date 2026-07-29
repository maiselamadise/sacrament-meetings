import Link from "next/link";
import { deleteMeeting } from "@/app/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-bold uppercase tracking-wide text-sky-800">
        {meeting.meetingType} meeting
      </p>
      <h2 className="mt-1 text-2xl font-bold text-slate-900">
        {formatDate(meeting.date)}
      </h2>
      <dl className="mt-4 space-y-1 text-sm text-slate-600">
        <div>
          <dt className="inline font-semibold text-slate-700">Conducting: </dt>
          <dd className="inline">{meeting.conducting}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-slate-700">Presiding: </dt>
          <dd className="inline">{meeting.presiding}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-slate-700">Opening hymn: </dt>
          <dd className="inline">
            #{meeting.openingHymn.number} {meeting.openingHymn.title}
          </dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          className="inline-flex rounded-md bg-sky-800 px-3 py-2 text-sm font-bold text-white hover:bg-sky-900"
          href={`/meetings/${meeting.id}`}
        >
          View agenda<span aria-hidden="true"> →</span>
        </Link>
        <Link
          className="inline-flex rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          href={`/meetings/${meeting.id}/edit`}
        >
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input name="meetingId" type="hidden" value={meeting.id} />
          <button
            className="rounded-md border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
