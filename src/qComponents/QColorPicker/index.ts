import { App } from 'vue';
import QColorPicker from './src/QColorPicker.vue';

/* istanbul ignore next */
QColorPicker.install = (app: App): void => {
  app.component(QColorPicker.name, QColorPicker);
};

export default QColorPicker;
