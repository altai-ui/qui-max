import { App } from 'vue';
import QSelect from './src/QSelect.vue';

QSelect.install = (app: App): void => {
  app.component(QSelect.name, QSelect);
};

export default QSelect;
export { QSelectProvider, QSelectState } from './src/types';
