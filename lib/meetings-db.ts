import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured. Pull your Vercel environment variables into .env.local.");
  }
  return neon(databaseUrl);
}

const meetingFields = `
  id,
  to_char(date, 'YYYY-MM-DD') AS "date",
  meeting_type AS "meetingType",
  presiding, conducting, announcements,
  opening_hymn AS "openingHymn",
  opening_prayer AS "openingPrayer",
  ward_business AS "wardBusiness",
  stake_business AS "stakeBusiness",
  sacrament_hymn AS "sacramentHymn",
  speakers,
  closing_hymn AS "closingHymn",
  closing_prayer AS "closingPrayer"
`;

function normalizePage(currentPage: number): number {
  return Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
}

export async function getMeetings(query = "", currentPage = 1): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;
  const returnAllMeetings = arguments.length === 0;
  const offset = (normalizePage(currentPage) - 1) * ITEMS_PER_PAGE;

  const queryText = `SELECT ${meetingFields} FROM meetings
     WHERE presiding ILIKE $1 OR conducting ILIKE $1 OR meeting_type ILIKE $1 OR speakers::text ILIKE $1
     ORDER BY date DESC${returnAllMeetings ? "" : " LIMIT $2 OFFSET $3"}`;

  const queryValues = returnAllMeetings
    ? [searchTerm]
    : [searchTerm, ITEMS_PER_PAGE, offset];

  const rows = await sql.query(queryText, queryValues);
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;
  const rows = await sql.query(
    `SELECT COUNT(*) AS count FROM meetings
     WHERE presiding ILIKE $1 OR conducting ILIKE $1 OR meeting_type ILIKE $1 OR speakers::text ILIKE $1`,
    [searchTerm],
  );
  return Math.ceil(Number(rows[0]?.count ?? 0) / ITEMS_PER_PAGE);
}

export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = await sql.query(`SELECT ${meetingFields} FROM meetings WHERE date = $1`, [date]);
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql.query(`SELECT ${meetingFields} FROM meetings WHERE id = $1`, [id]);
  return (rows[0] as SacramentMeeting | undefined) ?? null;
}

export async function addMeeting(_data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  void _data;
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  _id: number,
  _updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  void _id;
  void _updates;
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

export async function deleteMeeting(_id: number): Promise<boolean> {
  void _id;
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}
