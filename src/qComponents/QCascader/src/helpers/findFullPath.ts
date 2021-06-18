import type { Option } from '../types';

const findFullPath = (
  branches: Option[] | null,
  find: string | number | null
): string[] | null => {
  if (!branches) return null;

  let level: string[] | null = null;
  for (let i = 0; i < branches.length; i += 1) {
    if (branches[i].value === find) {
      level = [branches[i].label];
      break;
    }

    const { children } = branches[i];
    if (children) {
      const nextLevel = findFullPath(children, find);
      if (nextLevel !== null) {
        level = [branches[i].label, nextLevel].flat<
          (string | string[])[],
          number
        >(Infinity) as string[];
      }
    }
  }

  return level;
};

export default findFullPath;
