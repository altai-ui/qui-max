import type { Nullable } from '#/helpers';

import type { Option } from '../types';

const findFullPath = (
  branches: Nullable<Option[]>,
  find: Nullable<string | number>
): Nullable<string[]> => {
  if (!branches) return null;

  let level: Nullable<string[]> = null;
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
