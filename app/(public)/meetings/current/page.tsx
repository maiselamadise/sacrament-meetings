import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

function mostRecentSunday(): string {
  const today = new Date();
  const sunday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  return sunday.toISOString().slice(0, 10);
}

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();
  const meeting = meetings.find((item) => item.date === mostRecentSunday()) ?? meetings[0];
  if (!meeting) redirect("/meetings");
  redirect(`/meetings/${meeting.id}`);
}
