import { inject } from 'vue';
import type { App, Plugin } from 'vue';

import { createProgressBar } from './src';
import { PROGRESS_BAR_INJECTION_KEY } from './src/constants';
import type { QProgressBar, QProgressBarPluginOptions } from './src/types';

const QProgressBarPlugin: Plugin = {
  install: (app: App, options?: QProgressBarPluginOptions): void => {
    const progressBar = createProgressBar(options);
    app.provide<QProgressBar>(PROGRESS_BAR_INJECTION_KEY, progressBar);
  }
};

const useProgressBar = (): QProgressBar | undefined => {
  return inject<QProgressBar>(PROGRESS_BAR_INJECTION_KEY);
};

export { useProgressBar };
export type { QProgressBarPluginOptions };
export default QProgressBarPlugin;
