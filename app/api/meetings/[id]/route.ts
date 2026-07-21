import { getMeetingById } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const meeting = await getMeetingById(Number(params.id));

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}