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

function toPostgresArrayLiteral(values: string[]): string {
  if (!values.length) {
    return '{}';
  }

  const escapedValues = values.map((value) => value.replace(/"/g, '""'));
  return `{${escapedValues.map((value) => `"${value}"`).join(',')}}`;
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

export async function addMeeting(data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  const sql = getSql();

  try {
    const rows = await sql.query(
      `INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        data.date,
        data.meetingType,
        data.presiding,
        data.conducting,
        toPostgresArrayLiteral(data.announcements ?? []),
        JSON.stringify(data.openingHymn),
        data.openingPrayer,
        toPostgresArrayLiteral([]),
        data.stakeBusiness,
        JSON.stringify(data.sacramentHymn),
        toPostgresArrayLiteral([]),
        JSON.stringify(data.closingHymn),
        data.closingPrayer,
      ],
    );

    return { ...data, id: Number(rows[0]?.id ?? 0) };
  } catch (error) {
    console.error("Failed to add meeting", error);
    throw new Error("Failed to create meeting.");
  }
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  const sql = getSql();

  try {
    await sql.query(
      `UPDATE meetings SET
        date = COALESCE($1, date),
        meeting_type = COALESCE($2, meeting_type),
        presiding = COALESCE($3, presiding),
        conducting = COALESCE($4, conducting),
        announcements = COALESCE($5, announcements),
        opening_hymn = COALESCE($6, opening_hymn),
        opening_prayer = COALESCE($7, opening_prayer),
        ward_business = COALESCE($8, ward_business),
        stake_business = COALESCE($9, stake_business),
        sacrament_hymn = COALESCE($10, sacrament_hymn),
        speakers = COALESCE($11, speakers),
        closing_hymn = COALESCE($12, closing_hymn),
        closing_prayer = COALESCE($13, closing_prayer)
      WHERE id = $14`,
      [
        updates.date ?? null,
        updates.meetingType ?? null,
        updates.presiding ?? null,
        updates.conducting ?? null,
        updates.announcements ? toPostgresArrayLiteral(updates.announcements) : null,
        updates.openingHymn ? JSON.stringify(updates.openingHymn) : null,
        updates.openingPrayer ?? null,
        updates.wardBusiness ? toPostgresArrayLiteral([]) : null,
        updates.stakeBusiness ?? null,
        updates.sacramentHymn ? JSON.stringify(updates.sacramentHymn) : null,
        updates.speakers ? toPostgresArrayLiteral([]) : null,
        updates.closingHymn ? JSON.stringify(updates.closingHymn) : null,
        updates.closingPrayer ?? null,
        id,
      ],
    );

    return getMeetingById(id);
  } catch (error) {
    console.error("Failed to update meeting", error);
    throw new Error("Failed to update meeting.");
  }
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const sql = getSql();

  try {
    const result = await sql.query(`DELETE FROM meetings WHERE id = $1`, [id]);
    const rows = Array.isArray(result) ? result : [];
    return rows.length > 0;
  } catch (error) {
    console.error("Failed to delete meeting", error);
    throw new Error("Failed to delete meeting.");
  }
}
