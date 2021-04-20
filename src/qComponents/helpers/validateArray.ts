// eslint-disable-next-line import/prefer-default-export
export const validateArray = <T>(list: T[]) => {
  return (value: T): boolean => list.includes(value);
};
