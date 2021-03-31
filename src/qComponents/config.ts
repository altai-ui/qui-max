import { merge } from 'lodash-es';

export interface InstallOptions {
  zIndex: number;
  locale: string;
}

let $Q: InstallOptions = {
  zIndex: 2000,
  locale: 'ru'
};

const setConfig = (option: Partial<InstallOptions>): void => {
  $Q = merge($Q, option);
};

export type GetConfigKey = keyof InstallOptions | 'nextZIndex';
export type GetConfigResult = InstallOptions & { nextZIndex: number };

const getConfig = <T extends GetConfigKey>(key: T): GetConfigResult[T] => {
  if (key === 'nextZIndex') {
    $Q.zIndex += 1;
    return $Q.zIndex;
  }

  return $Q[key];
};

export { getConfig, setConfig };
