import { useMemo } from "react";
import { calculateMateria } from "../lib/materia";
import { useLocalState } from "../lib/storage";
import { Field } from "./Field";
import { StatCard } from "./StatCard";

const ACCENT = "var(--color-materia)";

export function MateriaPanel() {
  const [energy, setEnergy] = useLocalState<string>("materia.energy", "");
  const [tps, setTps] = useLocalState<string>("materia.tps", "20");

  const parsed = useMemo(() => {
    const e = parseFloat(energy.replace(",", "."));
    const t = parseFloat(tps.replace(",", "."));
    if (!Number.isFinite(e) || e <= 0) return { error: "Введи энергию в миллионах." };
    if (!Number.isFinite(t) || t <= 0) return { error: "TPS должен быть больше нуля." };
    return { result: calculateMateria(e, t) };
  }, [energy, tps]);

  return (
    <div className="glass p-6 sm:p-8 fade-in">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: ACCENT }}>
            Материя
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Сколько материи генерируется при заданной энергии и TPS.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="mt-6 min-h-[6rem]">
        {"error" in parsed ? (
          <div
            className="glass-inset px-4 py-3 text-sm"
            style={{ borderColor: "rgba(255, 80, 100, 0.4)", color: "#ff8aa0" }}
          >
            {parsed.error}
          </div>
        ) : (
          <div className="fade-in grid grid-cols-2 lg:grid-cols-4 gap-3">
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
    </div>
  );
}
