import { withInstall } from '../helpers';

import FormItem from './src/QFormItem.vue';

export const QFormItem = /* #__PURE__ */ withInstall(FormItem);

export type {
  QFormItemProps,
  QFormItemPropRules,
  QFormItemContext,
  QFormItemProvider,
  QFormItemInstance
} from './src/types';
