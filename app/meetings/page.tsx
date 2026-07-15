import { headers } from "next/headers";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (!host) throw new Error("Unable to determine the application URL.");

  const response = await fetch(`${protocol}://${host}/api/meetings`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load meetings.");

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div>
      <p className="eyebrow">Meeting archive</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Sacrament meetings</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Choose a meeting to view or print its complete program.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
    </div>
  );
}
