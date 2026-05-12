import { formatNumber } from "../lib/format";

interface Props {
  label: string;
  value: number;
  unit?: string;
  accent: string;
}

export function StatCard({ label, value, unit, accent }: Props) {
  return (
    <div className="glass-inset px-5 py-4 flex flex-col gap-1.5 min-w-0">
      <div
        className="text-[11px] font-medium uppercase tracking-[0.14em]"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </div>
      <div
        className="tabular text-3xl font-semibold leading-tight break-words"
        style={{ color: accent }}
      >
        {formatNumber(value)}
      </div>
      {unit && (
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {unit}
        </div>
      )}
    </div>
  );
}
