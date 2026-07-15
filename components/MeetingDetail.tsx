import type { Hymn, SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
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

function hymnText(hymn: Hymn): string {
  return `Hymn #${hymn.number}: ${hymn.title}`;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const hasAnnouncements = (meeting.announcements?.length ?? 0) > 0;

  return (
    <article className="program-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <header className="border-b border-slate-200 pb-6 text-center">
        <p className="eyebrow">Springfield Ward</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          {meeting.meetingType} meeting
        </h1>
        <p className="mt-2 text-lg text-slate-600">{formatDate(meeting.date)}</p>
      </header>

      <section className="mt-6 grid gap-3 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
        <p><span className="font-bold">Presiding:</span> {meeting.presiding}</p>
        <p><span className="font-bold">Conducting:</span> {meeting.conducting}</p>
      </section>

      {hasAnnouncements && (
        <section className="mt-8" aria-labelledby="announcements-heading">
          <h2 id="announcements-heading" className="text-xl font-bold text-slate-900">Announcements</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {meeting.announcements?.map((announcement) => <li key={announcement}>{announcement}</li>)}
          </ul>
        </section>
      )}

      <section className="mt-8" aria-labelledby="opening-heading">
        <h2 id="opening-heading" className="text-xl font-bold text-slate-900">Opening</h2>
        <dl className="mt-3 space-y-2 text-slate-700">
          <div><dt className="inline font-bold">Opening hymn: </dt><dd className="inline">{hymnText(meeting.openingHymn)}</dd></div>
          <div><dt className="inline font-bold">Opening prayer: </dt><dd className="inline">{meeting.openingPrayer}</dd></div>
        </dl>
      </section>

      <section className="mt-8" aria-labelledby="business-heading">
        <h2 id="business-heading" className="text-xl font-bold text-slate-900">Ward business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {meeting.wardBusiness.map((item) => <li key={item.description}>{item.description}</li>)}
          </ul>
        ) : <p className="mt-3 text-slate-600">No ward business scheduled.</p>}
        <p className="mt-3 text-slate-700"><span className="font-bold">Stake business:</span> {meeting.stakeBusiness ? "Yes" : "No"}</p>
      </section>

      <section className="mt-8" aria-labelledby="sacrament-heading">
        <h2 id="sacrament-heading" className="text-xl font-bold text-slate-900">Sacrament</h2>
        <p className="mt-3 text-slate-700"><span className="font-bold">Sacrament hymn: </span>{hymnText(meeting.sacramentHymn)}</p>
      </section>

      <section className="mt-8" aria-labelledby="program-heading">
        <h2 id="program-heading" className="text-xl font-bold text-slate-900">Program</h2>
        {meeting.speakers.length > 0 ? (
          <ol className="mt-3 space-y-3 text-slate-700">
            {meeting.speakers.map((item, index) => (
              <li key={`${item.type}-${item.name}-${index}`}>
                <p className="font-bold">{item.type === "musical-number" ? "Musical number" : "Speaker"}</p>
                <p>{item.name}{item.topic ? ` — ${item.topic}` : ""}</p>
              </li>
            ))}
          </ol>
        ) : <p className="mt-3 text-slate-600">No speakers or musical numbers scheduled.</p>}
      </section>

      <section className="mt-8 border-t border-slate-200 pt-6" aria-labelledby="closing-heading">
        <h2 id="closing-heading" className="text-xl font-bold text-slate-900">Closing</h2>
        <dl className="mt-3 space-y-2 text-slate-700">
          <div><dt className="inline font-bold">Closing hymn: </dt><dd className="inline">{hymnText(meeting.closingHymn)}</dd></div>
          <div><dt className="inline font-bold">Closing prayer: </dt><dd className="inline">{meeting.closingPrayer}</dd></div>
        </dl>
      </section>
    </article>
  );
}
