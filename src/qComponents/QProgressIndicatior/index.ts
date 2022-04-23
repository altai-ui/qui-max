import { getCurrentInstance, inject } from 'vue';
import type { App, Plugin } from 'vue';

import { createProgressIndicatior } from './src';
import { PROGRESS_INDICATIOR_INJECTION_KEY } from './src/constants';
import type {
  QProgressIndicatior,
  QProgressIndicatiorPluginOptions
} from './src/types';
import type { Nullable, Nillable } from '#/helpers';

let progressIndicatior: Nullable<QProgressIndicatior> = null;

const QProgressIndicatiorPlugin: Plugin = {
  install: (app: App, options?: QProgressIndicatiorPluginOptions): void => {
    progressIndicatior = createProgressIndicatior(options);
    app.provide<QProgressIndicatior>(
      PROGRESS_INDICATIOR_INJECTION_KEY,
      progressIndicatior
    );
  }
};

const useProgressIndicatior = (): Nillable<QProgressIndicatior> => {
  return getCurrentInstance()
    ? inject<QProgressIndicatior>(PROGRESS_INDICATIOR_INJECTION_KEY)
    : progressIndicatior;
};

export {
  QProgressIndicatiorPlugin as QProgressIndicatior,
  useProgressIndicatior
};
export type { QProgressIndicatiorPluginOptions };
