import { useEffect } from "react";
import { MateriaPanel } from "./components/MateriaPanel";
import { NeutroniumPanel } from "./components/NeutroniumPanel";
import { Tabs, type TabKey } from "./components/Tabs";
import { useLocalState } from "./lib/storage";

export default function App() {
  const [tab, setTab] = useLocalState<TabKey>("ui.tab", "materia");

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash.replace(/^#/, "");
    if (hash === "materia" || hash === "neutronium") setTab(hash);
  }, [setTab]);

  useEffect(() => {
    if (window.location.hash.replace(/^#/, "") !== tab) {
      history.replaceState(null, "", `#${tab}`);
    }
  }, [tab]);

  return (
    <>
      <div className="aura" data-theme={tab} />
      <div className="grain" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <header className="mb-8 sm:mb-12 flex flex-col items-start gap-4">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{ color: "var(--color-text-muted)" }}
            >
              AFK Tools · Minecraft
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Счётчик <span style={{ color: "var(--color-materia)" }}>материи</span>{" "}
              <span style={{ color: "var(--color-text-muted)" }}>и</span>{" "}
              <span style={{ color: "var(--color-neutronium)" }}>нейтрония</span>
            </h1>
          </div>

          <Tabs value={tab} onChange={setTab} />
        </header>

        {tab === "materia" ? <MateriaPanel /> : <NeutroniumPanel />}

        <footer className="mt-12 text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
          Параметры сохраняются локально в браузере · ссылка на вкладку через хеш в URL
        </footer>
      </main>
    </>
  );
}
