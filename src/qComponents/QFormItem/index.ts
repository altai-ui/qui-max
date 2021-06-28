import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QFormItem from './src/QFormItem.vue';

/* istanbul ignore next */
QFormItem.install = (app: App): void => {
  app.component(QFormItem.name, QFormItem);
};

export type {
  QFormItemProps,
  QFormItemPropRules,
  QFormItemContext,
  QFormItemProvider,
  QFormItemInstance
} from './src/types';
export default QFormItem as SFCWithInstall<App, typeof QFormItem>;
