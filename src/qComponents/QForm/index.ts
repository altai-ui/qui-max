import { App } from 'vue';
import QForm from './src/QForm.vue';
import type { QFormProvider } from './src/types';

QForm.install = (app: App): void => {
  app.component(QForm.name, QForm);
};

export { QFormProvider };
export default QForm;
