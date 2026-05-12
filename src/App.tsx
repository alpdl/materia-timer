import { useEffect } from "react";
import { MateriaPanel } from "./components/MateriaPanel";
import { NeutroniumPanel } from "./components/NeutroniumPanel";
import { Tabs, type TabKey } from "./components/Tabs";
import { useLocalState } from "./lib/storage";

export default function App() {
  const [tab, setTab] = useLocalState<TabKey>("ui.tab", "materia");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "materia" || hash === "neutronium") setTab(hash);
  }, [setTab]);

  useEffect(() => {
    if (window.location.hash.replace(/^#/, "") !== tab) {
      history.replaceState(null, "", `#${tab}`);
    }
  }, [tab]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <div
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          AFK Tools · Minecraft
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Счётчик материи и нейтрония
        </h1>
      </header>

      <div className="mb-8">
        <Tabs value={tab} onChange={setTab} />
      </div>

      {tab === "materia" ? <MateriaPanel /> : <NeutroniumPanel />}

      <footer className="mt-12 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
        Параметры сохраняются локально в браузере
      </footer>
    </main>
  );
}
