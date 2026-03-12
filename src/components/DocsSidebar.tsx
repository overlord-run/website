"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CategoryMeta } from "@/lib/docs";

interface DocsSidebarProps {
  categories: CategoryMeta[];
  mobile?: boolean;
  onNavigate?: () => void;
}

export function DocsSidebar({ categories, mobile, onNavigate }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? "" : "sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-4"}>
      <div className="space-y-5">
        {categories.map((cat) => (
          <SidebarCategory
            key={cat.slug}
            category={cat}
            currentPath={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}

function SidebarCategory({
  category,
  currentPath,
  onNavigate,
}: {
  category: CategoryMeta;
  currentPath: string;
  onNavigate?: () => void;
}) {
  const isActive = currentPath.startsWith(`/docs/${category.slug}`);
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        {category.title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && (
        <ul className="mt-2 space-y-0.5 border-l border-[var(--border)] pl-3">
          {category.pages.map((page) => {
            const href = `/docs/${category.slug}/${page.slug}`;
            const active = currentPath === href;
            return (
              <li key={page.slug}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={`block py-1 text-xs transition-colors ${
                    active
                      ? "text-[var(--accent)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
