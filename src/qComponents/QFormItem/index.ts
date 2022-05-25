import { withInstall } from '../helpers';

import FormItem from './src/QFormItem.vue';

export const QFormItem = withInstall(FormItem);

export type {
  QFormItemProps,
  QFormItemPropFor,
  QFormItemPropProp,
  QFormItemPropLabel,
  QFormItemPropSublabel,
  QFormItemPropError,
  QFormItemPropRules,
  QFormItemPropShowErrorMessage,
  QFormItemPropLabelSize,
  QFormItemContext,
  QFormItemProvider,
  QFormItemInstance
} from './src/types';
