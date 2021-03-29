import { App } from 'vue';
import QMessageBox from './src/QMessageBox.vue';

/* istanbul ignore next */
QMessageBox.install = (app: App): void => {
  app.component(QMessageBox.name, QMessageBox);
};

export * from './src/types';
export default QMessageBox;
