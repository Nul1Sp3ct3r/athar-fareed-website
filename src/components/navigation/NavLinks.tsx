"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Desktop nav with a wipe-underline hover and a dot for the active route. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-1">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group/nav relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
              active ? "text-ink" : "text-ink-soft hover:text-ink",
            )}
          >
            <span className="relative">
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-cobalt transition-transform duration-400 ease-out-expo",
                  active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                )}
              />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
