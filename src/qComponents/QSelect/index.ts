import { App } from 'vue';
import QSelect from './src/QSelect.vue';
import { QSelectProvider } from './src/types';

QSelect.install = (app: App): void => {
  app.component(QSelect.name, QSelect);
};

export default QSelect;
export { QSelectProvider };
