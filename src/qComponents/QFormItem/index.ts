import { App } from 'vue';

import QFormItem from './src/QFormItem.vue';

/* istanbul ignore next */
QFormItem.install = (app: App): void => {
  app.component(QFormItem.name, QFormItem);
};

export type {
  QFormItemContext,
  QFormItemProvider,
  FilteredRuleItem
} from './src/types';
export default QFormItem;
