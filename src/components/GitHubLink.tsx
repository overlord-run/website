"use client";

import { useState, useCallback } from "react";

export function GitHubLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  return (
    <>
      <a
        href="#"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-xs text-[var(--text-primary)] shadow-lg" style={{ animation: "fade-in-up 0.2s ease-out" }}>
          // coming soon
        </div>
      )}
    </>
  );
}
