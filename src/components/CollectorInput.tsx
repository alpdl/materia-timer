import { useId } from "react";
import { MAX_COLLECTORS } from "../lib/neutronium";

interface Props {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  accent: string;
}

function clamp(v: number) {
  if (!Number.isFinite(v) || v < 0) return 0;
  if (v > MAX_COLLECTORS) return MAX_COLLECTORS;
  return Math.floor(v);
}

export function CollectorInput({ label, hint, value, onChange, accent }: Props) {
  const id = useId();
  const atMin = value <= 0;
  const atMax = value >= MAX_COLLECTORS;

  return (
    <div className="surface flex flex-col gap-3 p-4">
      <div>
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
        <div className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {hint}
        </div>
      </div>

      <div
        className="flex h-10 items-center overflow-hidden rounded-lg border"
        style={{ borderColor: "var(--color-line)" }}
      >
        <button
          type="button"
          aria-label="Уменьшить"
          disabled={atMin}
          onClick={() => onChange(clamp(value - 1))}
          className="focus-ring h-full w-10 cursor-pointer text-lg leading-none transition-colors hover:bg-[color:var(--color-surface-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ color: "var(--color-text-soft)" }}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          min={0}
          max={MAX_COLLECTORS}
          step={1}
          value={value}
          onChange={(e) => {
            const next = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
            onChange(clamp(next));
          }}
          className="tabular focus-ring h-full flex-1 border-x bg-transparent text-center text-lg font-semibold outline-none"
          style={{
            color: value > 0 ? accent : "var(--color-text-muted)",
            borderColor: "var(--color-line)",
            ["--accent" as never]: accent,
          }}
        />
        <button
          type="button"
          aria-label="Увеличить"
          disabled={atMax}
          onClick={() => onChange(clamp(value + 1))}
          className="focus-ring h-full w-10 cursor-pointer text-lg leading-none transition-colors hover:bg-[color:var(--color-surface-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ color: "var(--color-text-soft)" }}
        >
          +
        </button>
      </div>
    </div>
  );
}
