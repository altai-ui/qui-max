import { App } from 'vue';
import QCheckboxGroup from './src/QCheckboxGroup.vue';
import { QCheckboxGroupProvider } from './src/types';

/* istanbul ignore next */
QCheckboxGroup.install = (app: App) => {
  app.component(QCheckboxGroup.name, QCheckboxGroup);
};

export default QCheckboxGroup;
export { QCheckboxGroupProvider };
