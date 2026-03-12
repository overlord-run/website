import Link from "next/link";
import { GitHubLink } from "./GitHubLink";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-xs text-[var(--text-secondary)] sm:flex-row sm:justify-between sm:px-6">
        <span>&copy; 2026 overlord</span>
        <div className="flex gap-6">
          <Link href="/docs/getting-started/installation" className="transition-colors hover:text-[var(--text-primary)]">
            documentation
          </Link>
          <GitHubLink className="transition-colors hover:text-[var(--text-primary)]">
            github
          </GitHubLink>
          <Link href="/docs/changelog/changelog" className="transition-colors hover:text-[var(--text-primary)]">
            changelog
          </Link>
        </div>
      </div>
    </footer>
  );
}
