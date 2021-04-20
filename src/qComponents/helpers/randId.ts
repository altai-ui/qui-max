// eslint-disable-next-line import/prefer-default-export
export const randId = (prefix?: string): string =>
  Math.random()
    .toString(36)
    .replace('0.', prefix ?? '');
