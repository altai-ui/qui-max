import type { Option } from '../types';

const findAllLeaves = (row: Option): (string | number)[] => {
  if (!row.children) return [row.value];

  let leaves: (string | number)[] = [];

  row.children.forEach(child => {
    const currentLeaves = findAllLeaves(child);
    leaves = [leaves, currentLeaves].flat(Infinity) as (string | number)[];
  });

  return leaves;
};

export default findAllLeaves;
