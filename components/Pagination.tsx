"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps { totalPages: number; }

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  function createPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
      {currentPage > 1 ? <Link className="button-secondary" href={createPageUrl(currentPage - 1)}>Previous</Link> : <span aria-hidden="true" className="button-secondary cursor-not-allowed opacity-50">Previous</span>}
      <p className="text-sm font-semibold text-slate-700">Page {currentPage} of {totalPages}</p>
      {currentPage < totalPages ? <Link className="button-secondary" href={createPageUrl(currentPage + 1)}>Next</Link> : <span aria-hidden="true" className="button-secondary cursor-not-allowed opacity-50">Next</span>}
    </nav>
  );
}
