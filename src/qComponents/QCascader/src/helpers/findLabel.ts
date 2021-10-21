import type { Nullable } from '#/helpers';

import type { Option } from '../types';

const findLabel = (
  branches: Nullable<Option[]>,
  find: Nullable<string | number>
): Nullable<string> => {
  const found = branches?.find(branch => branch.value === find)?.label ?? null;
  const children = branches
    ?.filter(branch => branch.children)
    .map(branch => branch.children)
    .flat(1) as Option[];

  if (!found && children?.length) {
    return findLabel(children, find);
  }
  return found;
};

export default findLabel;
