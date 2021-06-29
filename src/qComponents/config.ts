import { merge } from 'lodash-es';

export interface InstallOptions {
  nextZIndex: number;
  locale: string;
}

let $Q: InstallOptions = {
  nextZIndex: 0,
  locale: 'ru'
};

const setConfig = ({
  zIndex,
  ...options
}: Partial<Pick<InstallOptions, 'locale'> & { zIndex: number }>): void => {
  $Q.nextZIndex = zIndex ?? 2000;

  $Q = merge($Q, options);
};

const getConfig = <T extends keyof InstallOptions>(
  key: T
): InstallOptions[T] => {
  if (key === 'nextZIndex') $Q.nextZIndex += 1;

  return $Q[key];
};

export { getConfig, setConfig };
