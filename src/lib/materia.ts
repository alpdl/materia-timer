const MATERIA_COST = 40_000_000;

export interface MateriaResult {
  perTick: number;
  perSecond: number;
  perMinute: number;
  perHour: number;
}

export function calculateMateria(energyInMillions: number, ticksPerSecond: number): MateriaResult {
  const energy = energyInMillions * 1_000_000;
  const perTick = energy / MATERIA_COST;
  const perSecond = perTick * ticksPerSecond;
  const perMinute = perSecond * 60;
  const perHour = perMinute * 60;
  return { perTick, perSecond, perMinute, perHour };
}
