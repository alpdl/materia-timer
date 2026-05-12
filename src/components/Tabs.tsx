export type TabKey = "materia" | "neutronium";

interface Props {
  value: TabKey;
  onChange: (v: TabKey) => void;
}

const TABS: Array<{ key: TabKey; label: string; accent: string }> = [
  { key: "materia", label: "Материя", accent: "var(--color-materia)" },
  { key: "neutronium", label: "Нейтроний", accent: "var(--color-neutronium)" },
];

export function Tabs({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Выбор калькулятора"
      className="flex items-end gap-6 border-b"
      style={{ borderColor: "var(--color-line)" }}
    >
      {TABS.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            className="focus-ring -mb-px cursor-pointer border-b-2 px-1 pb-3 text-sm font-medium tracking-wide transition-colors"
            style={{
              borderColor: active ? t.accent : "transparent",
              color: active ? t.accent : "var(--color-text-muted)",
              ["--accent" as never]: t.accent,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
