import { withInstall } from '../helpers';

import Form from './src/QForm.vue';

export const QForm = withInstall(Form);

export type {
  QFormProps,
  QFormPropModel,
  QFormPropRules,
  QFormProvider,
  QFormInstance
} from './src/types';
