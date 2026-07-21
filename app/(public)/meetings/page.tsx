import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps { searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>; }
function firstValue(value: string | string[] | undefined): string { return Array.isArray(value) ? (value[0] ?? "") : (value ?? ""); }

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = firstValue(params.query);
  const pageValue = Number(firstValue(params.page));
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const [meetings, totalPages] = await Promise.all([getMeetings(query, currentPage), getMeetingsTotalPages(query)]);
  return (
    <div>
      <p className="eyebrow">Meeting archive</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Sacrament meetings</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Search current and past programs by leader, speaker, or meeting type.</p>
      <div className="mt-6"><MeetingSearch /></div>
      {meetings.length > 0 ? <div className="mt-8 grid gap-5 md:grid-cols-2">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div> : <p className="mt-8 rounded-lg bg-white p-5 text-slate-600 shadow-sm">No meetings match your search.</p>}
      {totalPages > 0 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
