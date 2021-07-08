type Fn = (next: () => void) => void;

export const createQueue = (): ((fn: Fn) => void) => {
  const pending: Fn[] = [];

  const next = (): void => {
    const fn = pending.shift();
    if (fn) fn(next);
  };

  return (fn: Fn): void => {
    pending.push(fn);
    if (pending.length === 1) next();
  };
};
