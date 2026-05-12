import { useId } from "react";
import { MAX_COLLECTORS } from "../lib/neutronium";

interface Props {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  accent: string;
}

export function CollectorInput({ label, hint, value, onChange, accent }: Props) {
  const id = useId();

  function clamp(v: number) {
    if (!Number.isFinite(v) || v < 0) return 0;
    if (v > MAX_COLLECTORS) return MAX_COLLECTORS;
    return Math.floor(v);
  }

  return (
    <div className="glass-inset p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {label}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            {hint}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Минус"
          onClick={() => onChange(clamp(value - 1))}
          className="h-9 w-9 rounded-lg cursor-pointer transition-colors text-lg leading-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--color-line)",
            color: "var(--color-text)",
          }}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          min={0}
          max={MAX_COLLECTORS}
          step={1}
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => {
            const next = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
            onChange(clamp(next));
          }}
          className="tabular flex-1 h-9 bg-transparent text-center text-lg font-semibold outline-none"
          style={{ color: accent }}
        />
        <button
          type="button"
          aria-label="Плюс"
          onClick={() => onChange(clamp(value + 1))}
          className="h-9 w-9 rounded-lg cursor-pointer transition-colors text-lg leading-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--color-line)",
            color: "var(--color-text)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
