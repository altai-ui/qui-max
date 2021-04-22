import { App } from 'vue';
import QOption from './src/QOption.vue';

QOption.install = (app: App): void => {
  app.component(QOption.name, QOption);
};

export default QOption;
export type { QOptionInstance, QOptionModel, QOptionProps } from './src/types';
