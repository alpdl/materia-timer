import { describe, expect, it } from "vitest";
import {
  calculateNeutronium,
  COLLECTOR_CYCLE_MINUTES,
  MINUTES_PER_DAY,
  totalCollectors,
  type Collectors,
} from "./neutronium";

const c = (heap: number, piece: number, ingot: number, block: number): Collectors => ({
  heap,
  piece,
  ingot,
  block,
});

const CYCLES_PER_DAY = MINUTES_PER_DAY / COLLECTOR_CYCLE_MINUTES;

describe("totalCollectors", () => {
  it("суммирует все типы", () => {
    expect(totalCollectors(c(1, 2, 3, 4))).toBe(10);
    expect(totalCollectors(c(0, 0, 0, 0))).toBe(0);
  });
});

describe("calculateNeutronium — иерархия", () => {
  it("1 сборщик кучек = 1 кучка за цикл", () => {
    const r = calculateNeutronium(c(1, 0, 0, 0));
    expect(r.heapsPerDay).toBeCloseTo(CYCLES_PER_DAY, 9);
    expect(r.piecesPerDay).toBeCloseTo(CYCLES_PER_DAY / 9, 9);
    expect(r.ingotsPerDay).toBeCloseTo(CYCLES_PER_DAY / 81, 9);
    expect(r.blocksPerDay).toBeCloseTo(CYCLES_PER_DAY / 729, 9);
  });

  it("1 сборщик кусочков = 1 кусочек за цикл", () => {
    const r = calculateNeutronium(c(0, 1, 0, 0));
    expect(r.piecesPerDay).toBeCloseTo(CYCLES_PER_DAY, 9);
    expect(r.heapsPerDay).toBeCloseTo(CYCLES_PER_DAY * 9, 9);
    expect(r.ingotsPerDay).toBeCloseTo(CYCLES_PER_DAY / 9, 9);
    expect(r.blocksPerDay).toBeCloseTo(CYCLES_PER_DAY / 81, 9);
  });

  it("1 сборщик слитков эквивалентен 9 сборщикам кусочков", () => {
    const ingot = calculateNeutronium(c(0, 0, 1, 0));
    const pieces = calculateNeutronium(c(0, 9, 0, 0));
    expect(ingot.piecesPerDay).toBeCloseTo(pieces.piecesPerDay, 9);
    expect(ingot.blocksPerDay).toBeCloseTo(pieces.blocksPerDay, 9);
  });

  it("1 сборщик блоков эквивалентен 9 сборщикам слитков", () => {
    const block = calculateNeutronium(c(0, 0, 0, 1));
    const ingots = calculateNeutronium(c(0, 0, 9, 0));
    expect(block.piecesPerDay).toBeCloseTo(ingots.piecesPerDay, 9);
    expect(block.heapsPerDay).toBeCloseTo(ingots.heapsPerDay, 9);
  });

  it("блок = 729 кучек по производительности", () => {
    const block = calculateNeutronium(c(0, 0, 0, 1));
    const heaps = calculateNeutronium(c(729, 0, 0, 0));
    expect(block.piecesPerDay).toBeCloseTo(heaps.piecesPerDay, 9);
  });

  it("суммирует все типы аддитивно", () => {
    const mix = calculateNeutronium(c(1, 1, 1, 1));
    const sum =
      calculateNeutronium(c(1, 0, 0, 0)).piecesPerDay +
      calculateNeutronium(c(0, 1, 0, 0)).piecesPerDay +
      calculateNeutronium(c(0, 0, 1, 0)).piecesPerDay +
      calculateNeutronium(c(0, 0, 0, 1)).piecesPerDay;
    expect(mix.piecesPerDay).toBeCloseTo(sum, 6);
  });
});

describe("calculateNeutronium — единицы времени", () => {
  it("perHour × 24 = perDay", () => {
    const r = calculateNeutronium(c(5, 3, 2, 1));
    expect(r.piecesPerHour * 24).toBeCloseTo(r.piecesPerDay, 6);
    expect(r.ingotsPerHour * 24).toBeCloseTo(r.ingotsPerDay, 6);
    expect(r.blocksPerHour * 24).toBeCloseTo(r.blocksPerDay, 6);
  });

  it("perMinute × 1440 = perDay", () => {
    const r = calculateNeutronium(c(5, 3, 2, 1));
    expect(r.piecesPerMinute * MINUTES_PER_DAY).toBeCloseTo(r.piecesPerDay, 6);
    expect(r.blocksPerMinute * MINUTES_PER_DAY).toBeCloseTo(r.blocksPerDay, 6);
  });
});

describe("calculateNeutronium — нулевой ввод", () => {
  it("нули дают нули", () => {
    const r = calculateNeutronium(c(0, 0, 0, 0));
    expect(r.piecesPerDay).toBe(0);
    expect(r.heapsPerDay).toBe(0);
    expect(r.blocksPerDay).toBe(0);
  });
});
