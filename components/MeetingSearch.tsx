"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("query", term);
    else params.delete("query");
    params.delete("page");
    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <div className="max-w-xl">
      <label className="block text-sm font-bold text-slate-700" htmlFor="meeting-search">Search meetings</label>
      <input className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400" defaultValue={searchParams.get("query") ?? ""} id="meeting-search" name="query" onChange={(event) => handleSearch(event.target.value)} placeholder="Search speakers, leaders, or meeting type" type="search" />
    </div>
  );
}
