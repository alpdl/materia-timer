const NBSP = " ";

export function formatNumber(value: number, maxDecimals = 6): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";

  const decimals = value >= 1000 ? 0 : value >= 100 ? 1 : value >= 1 ? 2 : maxDecimals;

  const fixed = value.toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const intWithSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

  if (!fracPart) return intWithSep;
  const trimmed = fracPart.replace(/0+$/, "");
  return trimmed ? `${intWithSep}.${trimmed}` : intWithSep;
}
