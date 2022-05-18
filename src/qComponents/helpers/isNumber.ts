export const isNumber = (value: unknown): boolean =>
  !Number.isNaN(Number(value));
