import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

function mostRecentSunday(): string {
  const today = new Date();
  const sunday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  return sunday.toISOString().slice(0, 10);
}

export default function CurrentMeetingPage() {
  const currentMeeting = getMeetings(mostRecentSunday())[0];
  const fallbackMeeting = getMeetings().at(-1);
  const meeting = currentMeeting ?? fallbackMeeting;

  if (!meeting) redirect("/meetings");
  redirect(`/meetings/${meeting.id}`);
}
