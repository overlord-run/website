import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-xs text-[var(--text-secondary)] sm:flex-row sm:justify-between sm:px-6">
        <span>&copy; 2026 overlord</span>
        <div className="flex gap-6">
          <Link href="/docs/getting-started/installation" className="transition-colors hover:text-[var(--text-primary)]">
            documentation
          </Link>
          <a href="https://github.com/nicepkg/overlord" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--text-primary)]">
            github
          </a>
          <Link href="/docs/changelog/changelog" className="transition-colors hover:text-[var(--text-primary)]">
            changelog
          </Link>
        </div>
      </div>
    </footer>
  );
}
