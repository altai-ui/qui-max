import { App } from 'vue';
import QForm from './src/QForm';

QForm.install = (app: App): void => {
  app.component(QForm.name, QForm);
};

export default QForm;
