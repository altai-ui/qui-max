import { getCurrentInstance, inject } from 'vue';
import type { App, Plugin } from 'vue';

import { createProgressBar } from './src';
import { PROGRESS_BAR_INJECTION_KEY } from './src/constants';
import type { QProgressBar, QProgressBarPluginOptions } from './src/types';
import { Nullable, Nillable } from '#/helpers';

let progressBar: Nullable<QProgressBar> = null;

const QProgressBarPlugin: Plugin = {
  install: (app: App, options?: QProgressBarPluginOptions): void => {
    progressBar = createProgressBar(options);
    app.provide<QProgressBar>(PROGRESS_BAR_INJECTION_KEY, progressBar);
  }
};

const useProgressBar = (): Nillable<QProgressBar> => {
  return getCurrentInstance()
    ? inject<QProgressBar>(PROGRESS_BAR_INJECTION_KEY)
    : progressBar;
};

export { useProgressBar };
export type { QProgressBarPluginOptions };
export default QProgressBarPlugin;
