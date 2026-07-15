import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(_request: Request, context: RouteContext<"/api/meetings/[id]">) {
  const { id } = await context.params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    return NextResponse.json({ error: "Meeting id must be a positive whole number." }, { status: 400 });
  }

  const meeting = getMeetingById(meetingId);
  if (!meeting) return NextResponse.json({ error: "Meeting not found." }, { status: 404 });
  return NextResponse.json(meeting);
}
