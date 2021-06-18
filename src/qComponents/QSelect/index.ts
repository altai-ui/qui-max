import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QSelect from './src/QSelect.vue';

QSelect.install = (app: App): void => {
  app.component(QSelect.name, QSelect);
};

export type {
  QSelectPropModelValue,
  NewOption,
  QSelectProvider,
  QSelectState,
  QSelectProps
} from './src/types';
export default QSelect as SFCWithInstall<App, typeof QSelect>;
