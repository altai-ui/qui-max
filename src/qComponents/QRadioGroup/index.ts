import { App } from 'vue';
import QRadioGroup from './src/QRadioGroup.vue';
import type { QRadioGroupProvider } from './src/types';

/* istanbul ignore next */
QRadioGroup.install = (app: App): void => {
  app.component(QRadioGroup.name, QRadioGroup);
};

export { QRadioGroupProvider };
export default QRadioGroup;
