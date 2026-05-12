export const COLLECTOR_CYCLE_MINUTES = 7;
export const MAX_COLLECTORS = 60;
export const MINUTES_PER_DAY = 1440;

export const PIECES_PER_HEAP = 1 / 9;
export const PIECES_PER_PIECE = 1;
export const PIECES_PER_INGOT = 9;
export const PIECES_PER_BLOCK = 81;

export interface Collectors {
  heap: number;
  piece: number;
  ingot: number;
  block: number;
}

export interface NeutroniumResult {
  heapsPerMinute: number;
  heapsPerHour: number;
  heapsPerDay: number;
  piecesPerMinute: number;
  piecesPerHour: number;
  piecesPerDay: number;
  ingotsPerMinute: number;
  ingotsPerHour: number;
  ingotsPerDay: number;
  blocksPerMinute: number;
  blocksPerHour: number;
  blocksPerDay: number;
}

export function totalCollectors(c: Collectors): number {
  return c.heap + c.piece + c.ingot + c.block;
}

export function calculateNeutronium(c: Collectors): NeutroniumResult {
  const cyclesPerDay = MINUTES_PER_DAY / COLLECTOR_CYCLE_MINUTES;

  const piecesPerDay =
    c.heap * cyclesPerDay * PIECES_PER_HEAP +
    c.piece * cyclesPerDay * PIECES_PER_PIECE +
    c.ingot * cyclesPerDay * PIECES_PER_INGOT +
    c.block * cyclesPerDay * PIECES_PER_BLOCK;

  const heapsPerDay = piecesPerDay / PIECES_PER_HEAP;
  const ingotsPerDay = piecesPerDay / PIECES_PER_INGOT;
  const blocksPerDay = piecesPerDay / PIECES_PER_BLOCK;

  return {
    heapsPerMinute: heapsPerDay / MINUTES_PER_DAY,
    heapsPerHour: heapsPerDay / 24,
    heapsPerDay,
    piecesPerMinute: piecesPerDay / MINUTES_PER_DAY,
    piecesPerHour: piecesPerDay / 24,
    piecesPerDay,
    ingotsPerMinute: ingotsPerDay / MINUTES_PER_DAY,
    ingotsPerHour: ingotsPerDay / 24,
    ingotsPerDay,
    blocksPerMinute: blocksPerDay / MINUTES_PER_DAY,
    blocksPerHour: blocksPerDay / 24,
    blocksPerDay,
  };
}
