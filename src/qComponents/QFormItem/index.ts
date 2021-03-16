import { App } from 'vue';
import QFormItem from './src/QFormItem.vue';

QFormItem.install = (app: App): void => {
  app.component(QFormItem.name, QFormItem);
};

export default QFormItem;
