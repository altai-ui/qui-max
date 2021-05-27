import { App } from 'vue';

import QForm from './src/QForm.vue';

/* istanbul ignore next */
QForm.install = (app: App): void => {
  app.component(QForm.name, QForm);
};

export type {
  QFormProps,
  QFormPropModel,
  QFormPropRules,
  QFormProvider,
  QFormInstance
} from './src/types';
export default QForm;
