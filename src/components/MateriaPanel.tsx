import { useMemo } from "react";
import { calculateMateria } from "../lib/materia";
import { useLocalState } from "../lib/storage";
import { Field } from "./Field";
import { ResetButton } from "./ResetButton";
import { StatCard } from "./StatCard";

const ACCENT = "var(--color-materia)";
const DEFAULT_ENERGY = "";
const DEFAULT_TPS = "20";

type Parsed =
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | { kind: "ok"; result: ReturnType<typeof calculateMateria> };

function parse(energy: string, tps: string): Parsed {
  const energyTrim = energy.trim();
  const tpsTrim = tps.trim();
  if (energyTrim === "") return { kind: "empty" };

  const e = parseFloat(energyTrim.replace(",", "."));
  if (!Number.isFinite(e) || e <= 0) {
    return { kind: "error", message: "Энергия должна быть положительным числом." };
  }
  const t = tpsTrim === "" ? 20 : parseFloat(tpsTrim.replace(",", "."));
  if (!Number.isFinite(t) || t <= 0) {
    return { kind: "error", message: "TPS должен быть больше нуля." };
  }
  return { kind: "ok", result: calculateMateria(e, t) };
}

export function MateriaPanel() {
  const [energy, setEnergy] = useLocalState<string>("materia.energy", DEFAULT_ENERGY);
  const [tps, setTps] = useLocalState<string>("materia.tps", DEFAULT_TPS);

  const parsed = useMemo(() => parse(energy, tps), [energy, tps]);
  const canReset = energy !== DEFAULT_ENERGY || tps !== DEFAULT_TPS;

  return (
    <section className="fade-in">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight" style={{ color: ACCENT }}>
            Материя
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Сколько материи получится из заданной энергии при текущем TPS.
          </p>
        </div>
        <ResetButton
          disabled={!canReset}
          onClick={() => {
            setEnergy(DEFAULT_ENERGY);
            setTps(DEFAULT_TPS);
          }}
        />
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Энергия"
          value={energy}
          onChange={setEnergy}
          step="0.01"
          min={0}
          placeholder="напр. 500"
          accent={ACCENT}
          suffix="млн FT"
          autoFocus
        />
        <Field
          label="TPS"
          value={tps}
          onChange={setTps}
          step="0.1"
          min={0}
          placeholder="20"
          accent={ACCENT}
          suffix="тика/сек"
        />
      </div>

      <div className="mt-6">
        {parsed.kind === "empty" && (
          <div
            className="surface px-4 py-6 text-center text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Введи энергию, чтобы увидеть производительность.
          </div>
        )}

        {parsed.kind === "error" && (
          <div
            className="rounded-lg border px-4 py-3 text-sm"
            style={{
              borderColor: "var(--color-danger)",
              background: "var(--color-danger-dim)",
              color: "var(--color-danger)",
            }}
          >
            {parsed.message}
          </div>
        )}

        {parsed.kind === "ok" && (
          <div className="fade-in grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="В тик" value={parsed.result.perTick} unit="материи" accent={ACCENT} />
            <StatCard
              label="В секунду"
              value={parsed.result.perSecond}
              unit="материи"
              accent={ACCENT}
            />
            <StatCard
              label="В минуту"
              value={parsed.result.perMinute}
              unit="материи"
              accent={ACCENT}
            />
            <StatCard label="В час" value={parsed.result.perHour} unit="материи" accent={ACCENT} />
          </div>
        )}
      </div>
    </section>
  );
}
