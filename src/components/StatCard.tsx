import { formatNumber } from "../lib/format";

interface Props {
  label: string;
  value: number;
  unit?: string;
  accent: string;
}

export function StatCard({ label, value, unit, accent }: Props) {
  return (
    <div className="surface flex min-w-0 flex-col gap-1 px-4 py-3">
      <div
        className="text-[11px] font-medium tracking-[0.12em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </div>
      <div
        className="tabular text-2xl leading-tight font-semibold break-words"
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
