export const validateArray = <T>(list: T[]) => {
  return (value: T): boolean => list.includes(value);
};
