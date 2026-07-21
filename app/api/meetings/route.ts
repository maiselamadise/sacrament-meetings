import { getMeetings } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET() {
  const meetings = await getMeetings();

  return NextResponse.json(meetings);
}