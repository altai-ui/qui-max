let isDragging = false;

interface Options {
  start?: (e: MouseEvent) => void;
  drag?: (e: MouseEvent) => void;
  end?: (e: MouseEvent) => void;
}

export default function (element: HTMLElement, options: Options): void {
  const moveFn = (event: MouseEvent) => {
    options.drag?.(event);
  };

  const upFn = (event: MouseEvent) => {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    options.end?.(event);
  };

  element.addEventListener('mousedown', event => {
    if (isDragging) return;

    document.onselectstart = () => false;
    document.ondragstart = () => false;
    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);

    isDragging = true;

    options.start?.(event);
  });
}
