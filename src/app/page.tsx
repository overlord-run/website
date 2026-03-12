import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CopyButton } from "@/components/CopyButton";

const steps = [
  {
    title: "define",
    desc: "describe your task in plain language — bug fixes, features, refactors. attach context and assign to any project.",
  },
  {
    title: "dispatch",
    desc: "overlord routes the task to the best available worker and ai agent. execution starts immediately across your fleet.",
  },
  {
    title: "monitor & take over",
    desc: "watch real-time progress via the built-in terminal. jump in at any point to guide, correct, or take full control.",
  },
];

const features = [
  {
    icon: "terminal",
    title: "real-time pty terminal",
    desc: "stream live agent output directly in the browser. full xterm.js integration with scrollback and search.",
  },
  {
    icon: "bot",
    title: "multi-agent support",
    desc: "first-class support for claude code, cursor, and codex. route tasks to the right agent automatically.",
  },
  {
    icon: "git-branch",
    title: "smart task routing",
    desc: "intelligent scheduling across your machine fleet. tasks land on the best available worker every time.",
  },
  {
    icon: "workflow",
    title: "pipeline automation",
    desc: "chain tasks into multi-stage pipelines. build, test, and deploy in one continuous flow.",
  },
  {
    icon: "users",
    title: "team collaboration",
    desc: "project-level permissions, audit logs, and shared dashboards. keep your whole team in sync.",
  },
  {
    icon: "shield",
    title: "secure by design",
    desc: "totp two-factor auth, scoped api tokens, and full audit trail. enterprise-ready from day one.",
  },
];

const archComponents = [
  { name: "lark / slack bot", desc: "chat-based task creation" },
  { name: "web dashboard", desc: "real-time monitoring + terminal" },
  { name: "developer cli", desc: "ov task / ov attach" },
  { name: "overlord server", desc: "nestjs + sqlite + redis + bullmq" },
  { name: "worker fleet", desc: "pty + agent + git worktrees" },
  { name: "git platform", desc: "auto push mr/pr on completion" },
];

const techStack = [
  { label: "backend", value: "nestjs + sqlite (wal) + redis + bullmq" },
  { label: "frontend", value: "react 19 + vite + tailwind + xterm.js" },
  { label: "agents", value: "claude code, cursor, codex" },
  { label: "auth", value: "jwt + totp 2fa + rbac" },
  { label: "deploy", value: "systemd / launchd + cloudflare tunnel" },
];

const setupSteps = [
  {
    num: "01",
    title: "deploy the server",
    desc: "install overlord and start the central server. it manages all tasks, authentication, and real-time communication.",
    command: "npm install -g @overlordai/cli @overlordai/server && overlord install",
    link: "/docs/getting-started/installation",
    linkText: "installation guide",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "register workers",
    desc: "set up worker machines that execute tasks. each worker runs ai agents in isolated workspaces with full git integration.",
    command: "overlord setup worker --server https://your-server.com --token <token>",
    link: "/docs/getting-started/worker-setup",
    linkText: "worker setup guide",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "connect as developer",
    desc: "install the developer cli to create tasks, attach to running sessions, and monitor progress from your terminal.",
    command: "npm install -g @overlordai/developer-cli && ov login",
    link: "/docs/guides/development-workflow",
    linkText: "development workflow",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    terminal: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    bot: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
    "git-branch": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    workflow: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v3a1 1 0 0 0 1 1h4" />
        <path d="M18 9v3a1 1 0 0 1-1 1h-4" />
        <line x1="12" y1="13" x2="12" y2="15" />
      </svg>
    ),
    users: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    shield: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, var(--accent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-32">
          <div className="mb-6 inline-flex items-center rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-4 py-1.5 text-xs text-[var(--accent)]">
            v1.0 — full automation platform
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            your machines. your subscriptions.
            <br />
            <span className="text-[var(--accent)]">full automation.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            orchestrate ai coding agents across your entire fleet. create tasks, watch them execute in real time, and merge the results — all from one dashboard.
          </p>
          <div className="mt-10">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-[var(--accent)]/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            how it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--text-secondary)]">
            three steps from idea to merged code.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-[var(--border)] sm:block"
                  />
                )}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  step {i + 1}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            everything you need
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--text-secondary)]">
            a complete platform for ai-assisted software development.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--accent)]/10 text-[var(--accent)]">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            architecture
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--text-secondary)]">
            a hub-and-spoke system built for scale. one server, unlimited workers.
          </p>

          {/* Architecture flow */}
          <div className="mt-14 flex flex-col items-center gap-3">
            {/* Entry layer */}
            <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
              {archComponents.slice(0, 3).map((c) => (
                <div
                  key={c.name}
                  className="rounded-[4px] border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-center"
                >
                  <div className="text-xs font-semibold text-[var(--accent)]">{c.name}</div>
                  <div className="mt-1 text-[10px] text-[var(--text-muted)]">{c.desc}</div>
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center gap-0">
              <div className="h-6 w-px bg-[var(--border)]" />
              <svg width="12" height="8" viewBox="0 0 12 8" className="text-[var(--text-muted)]">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor" />
              </svg>
            </div>

            {/* Server */}
            <div className="w-full max-w-2xl rounded-[4px] border-2 border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4 text-center">
              <div className="text-sm font-bold text-[var(--accent)]">{archComponents[3].name}</div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">{archComponents[3].desc}</div>
              <div className="mx-auto mt-3 flex max-w-sm flex-wrap justify-center gap-2">
                {["dispatcher", "notifier", "auth + rbac", "websocket gateway"].map((m) => (
                  <span
                    key={m}
                    className="rounded-[4px] bg-[var(--bg-primary)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center gap-0">
              <div className="h-6 w-px bg-[var(--border)]" />
              <svg width="12" height="8" viewBox="0 0 12 8" className="text-[var(--text-muted)]">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor" />
              </svg>
            </div>

            {/* Workers + Git */}
            <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
              {archComponents.slice(4, 6).map((c) => (
                <div
                  key={c.name}
                  className="rounded-[4px] border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-center"
                >
                  <div className="text-xs font-semibold text-[var(--accent)]">{c.name}</div>
                  <div className="mt-1 text-[10px] text-[var(--text-muted)]">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/docs/architecture/overview"
              className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              read full architecture docs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            built with
          </h2>
          <div className="mt-10 space-y-3">
            {techStack.map((t) => (
              <div
                key={t.label}
                className="flex items-baseline gap-4 rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3"
              >
                <span className="w-24 flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t.label}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Steps CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            get up and running
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--text-secondary)]">
            three components, three commands. deploy in minutes.
          </p>

          <div className="mt-14 space-y-4">
            {setupSteps.map((step) => (
              <div
                key={step.num}
                className="group rounded-[4px] border border-[var(--border)] bg-[var(--bg-primary)] transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6">
                  {/* Left: number + icon */}
                  <div className="flex items-center gap-4 sm:w-56 sm:flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--accent)]/10 text-[var(--accent)]">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                        step {step.num}
                      </div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: description + command */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                      {step.desc}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-[4px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5">
                      <code className="overflow-x-auto text-[11px] text-[var(--text-primary)] whitespace-nowrap">
                        <span className="select-none text-[var(--text-muted)]">$ </span>
                        {step.command}
                      </code>
                      <CopyButton text={step.command} />
                    </div>
                    <div className="mt-2">
                      <Link
                        href={step.link}
                        className="inline-flex items-center gap-1 text-[11px] text-[var(--accent)] transition-colors hover:brightness-110"
                      >
                        {step.linkText}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-[var(--accent)]/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
