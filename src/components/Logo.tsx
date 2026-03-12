export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const dim = size === "large" ? "h-10 w-10" : "h-8 w-8";
  const text = size === "large" ? "text-2xl" : "text-xl";

  return (
    <div
      className={`flex ${dim} items-center justify-center rounded-[4px] bg-[var(--accent)]`}
      aria-hidden
    >
      <span className={`${text} font-semibold`} style={{ color: "#0C0C0C" }}>
        ~
      </span>
    </div>
  );
}
