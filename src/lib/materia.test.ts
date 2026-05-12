import { describe, expect, it } from "vitest";
import { calculateMateria } from "./materia";

describe("calculateMateria", () => {
  it("производит 1 материю в тик при 40 млн EU и TPS=20", () => {
    const r = calculateMateria(40, 20);
    expect(r.perTick).toBeCloseTo(1, 9);
    expect(r.perSecond).toBeCloseTo(20, 9);
    expect(r.perMinute).toBeCloseTo(1200, 9);
    expect(r.perHour).toBeCloseTo(72_000, 9);
  });

  it("масштабируется линейно по энергии", () => {
    const a = calculateMateria(100, 20);
    const b = calculateMateria(200, 20);
    expect(b.perTick / a.perTick).toBeCloseTo(2, 9);
    expect(b.perHour / a.perHour).toBeCloseTo(2, 9);
  });

  it("масштабируется линейно по TPS", () => {
    const a = calculateMateria(40, 10);
    const b = calculateMateria(40, 20);
    expect(a.perTick).toBeCloseTo(b.perTick, 9);
    expect(b.perSecond / a.perSecond).toBeCloseTo(2, 9);
  });

  it("perMinute = perSecond × 60", () => {
    const r = calculateMateria(123.45, 18.7);
    expect(r.perMinute).toBeCloseTo(r.perSecond * 60, 9);
    expect(r.perHour).toBeCloseTo(r.perMinute * 60, 9);
  });
});
