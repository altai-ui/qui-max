import type { App } from 'vue';
import QOption from './src/QOption.vue';

QOption.install = (app: App): void => {
  app.component(QOption.name, QOption);
};

export type {
  QOptionInstance,
  QOptionPropValue,
  QOptionModel,
  QOptionProps
} from './src/types';
export default QOption as SFCWithInstall<App, typeof QOption>;
