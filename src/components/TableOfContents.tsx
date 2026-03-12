"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector("[data-mdx-content]");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: (el.textContent || "").replace(/\s*#\s*$/, ""),
      level: parseInt(el.tagName[1]),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pl-4 xl:block">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        on this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: (h.level - 2) * 12 }}>
            <a
              href={`#${h.id}`}
              className={`block py-0.5 text-xs transition-colors ${
                activeId === h.id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
