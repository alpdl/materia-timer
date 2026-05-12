export type TabKey = "materia" | "neutronium";

interface Props {
  value: TabKey;
  onChange: (v: TabKey) => void;
}

export function Tabs({ value, onChange }: Props) {
  const tabs: { key: TabKey; label: string; color: string }[] = [
    { key: "materia", label: "Материя", color: "var(--color-materia)" },
    { key: "neutronium", label: "Нейтроний", color: "var(--color-neutronium-soft)" },
  ];

  return (
    <div
      role="tablist"
      aria-label="Выбор калькулятора"
      className="glass relative inline-flex items-center gap-1 p-1.5"
      style={{ borderRadius: 999 }}
    >
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            className="relative px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
            style={{
              color: active ? "white" : "var(--color-text-muted)",
              borderRadius: 999,
            }}
          >
            {active && (
              <span
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  borderRadius: 999,
                  background:
                    t.key === "materia"
                      ? "linear-gradient(135deg, rgba(255,46,126,0.95), rgba(178,18,80,0.95))"
                      : "linear-gradient(135deg, rgba(70,80,90,0.95), rgba(30,38,46,0.95))",
                  boxShadow: `0 8px 30px -10px ${t.color}`,
                }}
              />
            )}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
