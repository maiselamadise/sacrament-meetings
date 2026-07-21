import { NextRequest, NextResponse } from "next/server";
import { getMeetings, getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const meetings = date ? await getMeetingsByDate(date) : await getMeetings();
  return NextResponse.json(meetings);
}
