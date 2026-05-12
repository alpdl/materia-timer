import { useMemo } from "react";
import {
  calculateNeutronium,
  totalCollectors,
  MAX_COLLECTORS,
  type Collectors,
} from "../lib/neutronium";
import { useLocalState } from "../lib/storage";
import { CollectorInput } from "./CollectorInput";
import { StatCard } from "./StatCard";

const ACCENT = "var(--color-neutronium)";
const DEFAULT: Collectors = { heap: 0, piece: 0, ingot: 0, block: 0 };

const COLLECTOR_META: Array<{ key: keyof Collectors; label: string; hint: string }> = [
  { key: "heap", label: "Сборщики кучек", hint: "9 кучек = 1 кусочек" },
  { key: "piece", label: "Сборщики кусочков", hint: "базовая единица" },
  { key: "ingot", label: "Сборщики слитков", hint: "1 слиток = 9 кусочков" },
  { key: "block", label: "Сборщики блоков", hint: "1 блок = 9 слитков" },
];

const ROWS: Array<{
  key: keyof Collectors;
  title: string;
  pickPerMin: (r: ReturnType<typeof calculateNeutronium>) => number;
  pickPerHour: (r: ReturnType<typeof calculateNeutronium>) => number;
  pickPerDay: (r: ReturnType<typeof calculateNeutronium>) => number;
}> = [
  {
    key: "heap",
    title: "В кучках",
    pickPerMin: (r) => r.heapsPerMinute,
    pickPerHour: (r) => r.heapsPerHour,
    pickPerDay: (r) => r.heapsPerDay,
  },
  {
    key: "piece",
    title: "В кусочках",
    pickPerMin: (r) => r.piecesPerMinute,
    pickPerHour: (r) => r.piecesPerHour,
    pickPerDay: (r) => r.piecesPerDay,
  },
  {
    key: "ingot",
    title: "В слитках",
    pickPerMin: (r) => r.ingotsPerMinute,
    pickPerHour: (r) => r.ingotsPerHour,
    pickPerDay: (r) => r.ingotsPerDay,
  },
  {
    key: "block",
    title: "В блоках",
    pickPerMin: (r) => r.blocksPerMinute,
    pickPerHour: (r) => r.blocksPerHour,
    pickPerDay: (r) => r.blocksPerDay,
  },
];

export function NeutroniumPanel() {
  const [collectors, setCollectors] = useLocalState<Collectors>("neutronium.collectors", DEFAULT);

  const total = totalCollectors(collectors);
  const overflow = total > MAX_COLLECTORS;
  const empty = total === 0;

  const result = useMemo(
    () => (overflow || empty ? null : calculateNeutronium(collectors)),
    [collectors, overflow, empty],
  );

  function update<K extends keyof Collectors>(key: K, value: number) {
    setCollectors((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="glass p-6 sm:p-8 fade-in">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: ACCENT }}>
            Нейтроний
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Один сборщик заканчивает цикл за 7 минут.
          </p>
        </div>

        <div
          className="glass-inset px-4 py-2.5 text-sm tabular flex items-center gap-2"
          style={{
            borderColor: overflow ? "rgba(255,80,100,0.5)" : "var(--color-line)",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>Всего сборщиков</span>
          <span
            className="font-semibold"
            style={{ color: overflow ? "#ff8aa0" : "var(--color-text)" }}
          >
            {total}
          </span>
          <span style={{ color: "var(--color-text-muted)" }}>/ {MAX_COLLECTORS}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COLLECTOR_META.map((m) => (
          <CollectorInput
            key={m.key}
            label={m.label}
            hint={m.hint}
            value={collectors[m.key]}
            onChange={(v) => update(m.key, v)}
            accent={ACCENT}
          />
        ))}
      </div>

      <div className="mt-8">
        {overflow ? (
          <div
            className="glass-inset px-4 py-3 text-sm"
            style={{ borderColor: "rgba(255,80,100,0.4)", color: "#ff8aa0" }}
          >
            Общее количество сборщиков не может превышать {MAX_COLLECTORS}.
          </div>
        ) : empty ? (
          <div
            className="glass-inset px-4 py-6 text-sm text-center"
            style={{ color: "var(--color-text-muted)" }}
          >
            Добавь хотя бы одного сборщика, чтобы увидеть производительность.
          </div>
        ) : (
          <div className="space-y-5 fade-in">
            {ROWS.map((row) => (
              <section key={row.key}>
                <h3
                  className="mb-2 text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {row.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <StatCard label="В минуту" value={row.pickPerMin(result!)} accent={ACCENT} />
                  <StatCard label="В час" value={row.pickPerHour(result!)} accent={ACCENT} />
                  <StatCard label="В день" value={row.pickPerDay(result!)} accent={ACCENT} />
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
