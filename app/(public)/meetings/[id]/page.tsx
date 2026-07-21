import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps { params: Promise<{ id: string }>; }

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);
  if (!Number.isInteger(meetingId) || meetingId < 1) notFound();
  const meeting = await getMeetingById(meetingId);
  if (!meeting) notFound();
  return <div><div className="back-link mb-6 flex flex-wrap items-center justify-between gap-4"><Link className="text-sm font-bold text-sky-800 hover:underline" href="/meetings">← All meetings</Link><PrintButton /></div><MeetingDetail meeting={meeting} /></div>;
}
