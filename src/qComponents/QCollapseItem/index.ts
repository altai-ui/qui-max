import { App } from 'vue';
import QCollapseItem from './src/QCollapseItem.vue';

/* istanbul ignore next */
QCollapseItem.install = (app: App): void => {
  app.component(QCollapseItem.name, QCollapseItem);
};

export default QCollapseItem;
