import { withInstall } from '../helpers';

import Form from './src/QForm.vue';

export const QForm = /* #__PURE__ */ withInstall(Form);

export type {
  QFormProps,
  QFormPropModel,
  QFormPropRules,
  QFormProvider,
  QFormInstance
} from './src/types';
