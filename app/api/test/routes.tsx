// app/api/test/route.ts

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`SELECT NOW()`;

    return NextResponse.json({
      connected: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}