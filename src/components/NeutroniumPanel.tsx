import { useMemo } from "react";
import { formatNumber } from "../lib/format";
import {
  calculateNeutronium,
  MAX_COLLECTORS,
  totalCollectors,
  type Collectors,
} from "../lib/neutronium";
import { useLocalState } from "../lib/storage";
import { CollectorInput } from "./CollectorInput";
import { ResetButton } from "./ResetButton";

const ACCENT = "var(--color-neutronium)";
const DEFAULT: Collectors = { heap: 0, piece: 0, ingot: 0, block: 0 };

const COLLECTORS: Array<{ key: keyof Collectors; label: string; hint: string }> = [
  { key: "heap", label: "Сборщики кучек", hint: "9 кучек = 1 кусочек" },
  { key: "piece", label: "Сборщики кусочков", hint: "базовая единица" },
  { key: "ingot", label: "Сборщики слитков", hint: "1 слиток = 9 кусочков" },
  { key: "block", label: "Сборщики блоков", hint: "1 блок = 9 слитков" },
];

const ROWS: Array<{
  key: keyof Collectors;
  title: string;
  pickMin: (r: ReturnType<typeof calculateNeutronium>) => number;
  pickHour: (r: ReturnType<typeof calculateNeutronium>) => number;
  pickDay: (r: ReturnType<typeof calculateNeutronium>) => number;
}> = [
  {
    key: "heap",
    title: "Кучки",
    pickMin: (r) => r.heapsPerMinute,
    pickHour: (r) => r.heapsPerHour,
    pickDay: (r) => r.heapsPerDay,
  },
  {
    key: "piece",
    title: "Кусочки",
    pickMin: (r) => r.piecesPerMinute,
    pickHour: (r) => r.piecesPerHour,
    pickDay: (r) => r.piecesPerDay,
  },
  {
    key: "ingot",
    title: "Слитки",
    pickMin: (r) => r.ingotsPerMinute,
    pickHour: (r) => r.ingotsPerHour,
    pickDay: (r) => r.ingotsPerDay,
  },
  {
    key: "block",
    title: "Блоки",
    pickMin: (r) => r.blocksPerMinute,
    pickHour: (r) => r.blocksPerHour,
    pickDay: (r) => r.blocksPerDay,
  },
];

export function NeutroniumPanel() {
  const [collectors, setCollectors] = useLocalState<Collectors>("neutronium.collectors", DEFAULT);
  const total = totalCollectors(collectors);
  const overflow = total > MAX_COLLECTORS;
  const empty = total === 0;
  const canReset = !empty;

  const result = useMemo(
    () => (overflow || empty ? null : calculateNeutronium(collectors)),
    [collectors, overflow, empty],
  );

  function update<K extends keyof Collectors>(key: K, value: number) {
    setCollectors((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section className="fade-in">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight" style={{ color: ACCENT }}>
            Нейтроний
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Один сборщик заканчивает цикл за 7 минут.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="tabular flex items-baseline gap-1.5 text-sm">
            <span
              className="font-semibold"
              style={{ color: overflow ? "var(--color-danger)" : "var(--color-text)" }}
            >
              {total}
            </span>
            <span style={{ color: "var(--color-text-muted)" }}>/ {MAX_COLLECTORS} сборщиков</span>
          </div>
          <ResetButton disabled={!canReset} onClick={() => setCollectors(DEFAULT)} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {COLLECTORS.map((m) => (
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

      <div className="mt-6">
        {overflow && (
          <div
            className="rounded-lg border px-4 py-3 text-sm"
            style={{
              borderColor: "var(--color-danger)",
              background: "var(--color-danger-dim)",
              color: "var(--color-danger)",
            }}
          >
            Всего сборщиков не больше {MAX_COLLECTORS}. Сейчас {total}.
          </div>
        )}

        {empty && (
          <div
            className="surface px-4 py-6 text-center text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Добавь хотя бы одного сборщика, чтобы увидеть производительность.
          </div>
        )}

        {result && (
          <div
            className="fade-in overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--color-line)" }}
          >
            <table className="tabular w-full border-collapse text-sm">
              <thead>
                <tr style={{ background: "var(--color-surface)" }}>
                  <th
                    className="px-4 py-2.5 text-left text-[11px] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Единица
                  </th>
                  <th
                    className="px-4 py-2.5 text-right text-[11px] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    В минуту
                  </th>
                  <th
                    className="px-4 py-2.5 text-right text-[11px] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    В час
                  </th>
                  <th
                    className="px-4 py-2.5 text-right text-[11px] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    В день
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.key}
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid var(--color-line)",
                    }}
                  >
                    <td className="px-4 py-3 text-left font-medium">{row.title}</td>
                    <Cell value={row.pickMin(result)} accent={ACCENT} />
                    <Cell value={row.pickHour(result)} accent={ACCENT} />
                    <Cell value={row.pickDay(result)} accent={ACCENT} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function Cell({ value, accent }: { value: number; accent: string }) {
  return (
    <td className="px-4 py-3 text-right font-semibold" style={{ color: accent }}>
      {formatNumber(value)}
    </td>
  );
}
