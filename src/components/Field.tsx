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
        className="text-[11px] font-medium uppercase tracking-[0.14em]"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </span>
      <div
        className="glass-inset flex items-center gap-2 px-4 h-12 focus-within:border-[color:var(--accent)]"
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
          className="tabular w-full bg-transparent text-lg outline-none placeholder:text-white/20"
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
