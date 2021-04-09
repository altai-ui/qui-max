import { App } from 'vue';
import QOption from './src/QOption.vue';
import { QOptionInterface } from './src/types';

QOption.install = (app: App): void => {
  app.component(QOption.name, QOption);
};

export default QOption;
export { QOptionInterface };
