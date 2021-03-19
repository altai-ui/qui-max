import { App } from 'vue';
import QFormItem from './src/QFormItem';
import type { QFormItemProvider } from './src/types';

QFormItem.install = (app: App): void => {
  app.component(QFormItem.name, QFormItem);
};

export { QFormItemProvider };
export default QFormItem;
