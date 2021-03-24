import { App } from 'vue';
import QFormItem from './src/QFormItem.vue';
import type { QFormItemContext, QFormItemProvider } from './src/types';

QFormItem.install = (app: App): void => {
  app.component(QFormItem.name, QFormItem);
};

export { QFormItemContext, QFormItemProvider };
export default QFormItem;
