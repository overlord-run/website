"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface SearchEntry {
  title: string;
  href: string;
  category: string;
  body: string;
}

interface SearchResult extends SearchEntry {
  /** snippet with match highlighted */
  snippet: string;
}

function searchEntries(entries: SearchEntry[], query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const entry of entries) {
    const titleMatch = entry.title.toLowerCase().includes(q);
    const bodyLower = entry.body.toLowerCase();
    const bodyIdx = bodyLower.indexOf(q);

    if (!titleMatch && bodyIdx === -1) continue;

    let snippet = "";
    if (bodyIdx !== -1) {
      const start = Math.max(0, bodyIdx - 40);
      const end = Math.min(entry.body.length, bodyIdx + q.length + 60);
      snippet = (start > 0 ? "..." : "") + entry.body.slice(start, end) + (end < entry.body.length ? "..." : "");
    } else {
      snippet = entry.body.slice(0, 100) + (entry.body.length > 100 ? "..." : "");
    }

    results.push({ ...entry, snippet });
  }

  // title matches first
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1;
    const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1;
    return aTitle - bTitle;
  });

  return results.slice(0, 8);
}

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index on first focus
  const loadIndex = useCallback(async () => {
    if (index.length > 0) return;
    try {
      const res = await fetch("/api/search");
      const data = await res.json();
      setIndex(data);
    } catch {
      // silently fail
    }
  }, [index.length]);

  // Keyboard shortcut: Ctrl/Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search on query change
  useEffect(() => {
    setResults(searchEntries(index, query));
    setSelected(0);
  }, [query, index]);

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].href);
    }
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => {
          setOpen(true);
          loadIndex();
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex w-full items-center gap-2 rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-[11px] text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        search docs...
        <kbd className="ml-auto rounded border border-[var(--border)] px-1 py-0.5 text-[9px] text-[var(--text-muted)]">
          ⌘K
        </kbd>
      </button>

      {/* Modal — portaled to body to escape sidebar overflow clipping */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={() => { setOpen(false); setQuery(""); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Dialog */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl"
          >
            {/* Input */}
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={loadIndex}
                onKeyDown={handleKeyDown}
                placeholder="search documentation..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] text-[var(--text-muted)]">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-xs text-[var(--text-muted)]">
                  // no results for &quot;{query}&quot;
                </div>
              )}
              {results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => navigate(result.href)}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors ${
                    i === selected
                      ? "bg-[var(--accent)]/10"
                      : "hover:bg-[var(--bg-input)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)]">{result.category}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">/</span>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{result.title}</span>
                  </div>
                  <span className="line-clamp-1 text-[11px] text-[var(--text-secondary)]">
                    {result.snippet}
                  </span>
                </button>
              ))}
              {!query && (
                <div className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
                  // type to search across all documentation
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
