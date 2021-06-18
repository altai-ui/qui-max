import { merge } from 'lodash-es';

export interface InstallOptions {
  zIndex: number;
  locale: string;
}

let $Q: any = {
  zIndex: 2000,
  locale: 'ru'
};

const setConfig = (option: Partial<InstallOptions>): void => {
  $Q = merge($Q, option);
};

export type GetConfigKey = keyof InstallOptions | 'nextZIndex';
export type GetConfigResult = InstallOptions & { nextZIndex: number };

const getConfig = (key: any): any => {
  if (key === 'nextZIndex') {
    $Q.zIndex += 1;
    return $Q.zIndex;
  }

  return $Q[key];
};

export { getConfig, setConfig };
