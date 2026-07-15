"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex gap-1">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === link.href : pathname.startsWith(link.href);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-sky-800 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
