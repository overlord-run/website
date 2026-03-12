import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubLink } from "./GitHubLink";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontSize: "20px" }}>
            overlord
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            docs
          </Link>
          <GitHubLink className="text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
            github
          </GitHubLink>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
