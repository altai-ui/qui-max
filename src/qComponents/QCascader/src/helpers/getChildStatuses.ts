import type { Option, QCascaderPropModelValue } from '../QCascader';

const getChildStatuses = (
  option: Option,
  checkedValues: QCascaderPropModelValue
): boolean[] => {
  if (!checkedValues || !Array.isArray(checkedValues)) return [];

  const checkedArray: boolean[] = [];

  const goToTheLast = (childOption: Option): void => {
    if (childOption.children) {
      childOption.children.forEach(goToTheLast);
    } else {
      checkedArray.push(checkedValues.includes(childOption.value) ?? false);
    }
  };

  goToTheLast(option);

  return checkedArray;
};

export default getChildStatuses;
