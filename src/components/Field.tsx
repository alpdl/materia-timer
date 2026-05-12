import { useId } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  accent: string;
  suffix?: string;
  autoFocus?: boolean;
}

export function Field({
  label,
  value,
  onChange,
  step = "any",
  min,
  max,
  placeholder,
  accent,
  suffix,
  autoFocus,
}: Props) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span
        className="text-[11px] font-medium tracking-[0.12em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </span>
      <div
        className="surface flex h-11 items-center gap-2 px-3 transition-colors focus-within:border-[color:var(--accent)]"
        style={{ ["--accent" as never]: accent }}
      >
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          className="tabular w-full bg-transparent text-base outline-none placeholder:text-[color:var(--color-text-muted)]"
        />
        {suffix && (
          <span className="text-xs whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}
