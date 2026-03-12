"use client";

import { useState } from "react";
import type { CategoryMeta } from "@/lib/docs";
import { DocsSidebar } from "./DocsSidebar";

export function MobileDocsSidebar({ categories }: { categories: CategoryMeta[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-[4px] border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] lg:hidden"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        menu
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto bg-[var(--bg-primary)] border-r border-[var(--border)] p-6 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)]">documentation</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-[4px] p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <DocsSidebar categories={categories} mobile onNavigate={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
