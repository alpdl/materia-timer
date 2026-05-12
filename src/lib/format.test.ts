import { describe, expect, it } from "vitest";
import { formatNumber } from "./format";

const NBSP = " ";

describe("formatNumber", () => {
  it("ноль", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("дробные < 1", () => {
    expect(formatNumber(0.5)).toBe("0.5");
    expect(formatNumber(0.123456789)).toBe("0.123457");
  });

  it("отрезает хвостовые нули", () => {
    expect(formatNumber(1.5)).toBe("1.5");
    expect(formatNumber(2)).toBe("2");
  });

  it("разделяет тысячи неразрывным пробелом", () => {
    expect(formatNumber(1234)).toBe(`1${NBSP}234`);
    expect(formatNumber(1_000_000)).toBe(`1${NBSP}000${NBSP}000`);
  });

  it("обрабатывает не-числа", () => {
    expect(formatNumber(NaN)).toBe("—");
    expect(formatNumber(Infinity)).toBe("—");
  });
});
