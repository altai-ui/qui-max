// eslint-disable-next-line import/prefer-default-export
export const getSibling = (
  el: HTMLElement,
  distance: number
): Nullable<HTMLElement> => {
  const { parentNode } = el;
  if (!parentNode) return null;

  const siblings = parentNode.querySelectorAll<HTMLElement>(
    '.q-cascader-row[tabindex="-1"]'
  );
  const index = Array.from(siblings).indexOf(el);
  return siblings[index + distance] ?? null;
};
