"use client";

import { useSession } from "next-auth/react";
import NavLinks from "@/components/NavLinks";
import { SignOutButton } from "@/components/sign-out-button";

function CurrentDate() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(new Date());

  return <p className="text-xs text-slate-500">{today}</p>;
}

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-xl font-bold text-slate-900">
            Springfield Ward
          </p>
          <p className="text-sm text-slate-600">
            Sacrament Meeting Planner
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex items-center gap-2">
            <NavLinks />
            {session?.user ? <SignOutButton /> : null}
          </div>
          <CurrentDate />
        </div>
      </div>
    </header>
  );
}