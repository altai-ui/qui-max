import { App } from 'vue';
import QCheckboxGroup from './src/QCheckboxGroup.vue';

/* istanbul ignore next */
QCheckboxGroup.install = (app: App) => {
  app.component(QCheckboxGroup.name, QCheckboxGroup);
};

export default QCheckboxGroup;
