import { App } from 'vue';
import QInput from './src/QInput';

/* istanbul ignore next */
QInput.install = (app: App): void => {
  app.component(QInput.name, QInput);
};

export default QInput;
