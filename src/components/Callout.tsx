interface CalloutProps {
  type?: "info" | "warning" | "danger";
  children: React.ReactNode;
}

const styles = {
  info: {
    border: "border-[var(--accent)]",
    bg: "bg-[var(--accent)]/5",
    icon: "text-[var(--accent)]",
    label: "info",
  },
  warning: {
    border: "border-[var(--warning)]",
    bg: "bg-[var(--warning)]/5",
    icon: "text-[var(--warning)]",
    label: "warning",
  },
  danger: {
    border: "border-[var(--destructive)]",
    bg: "bg-[var(--destructive)]/5",
    icon: "text-[var(--destructive)]",
    label: "danger",
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`my-4 rounded-[4px] border-l-2 ${s.border} ${s.bg} px-4 py-3`}>
      <div className={`mb-1 text-[10px] font-semibold uppercase tracking-wider ${s.icon}`}>
        {s.label}
      </div>
      <div className="text-xs leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}
