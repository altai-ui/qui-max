import { App } from 'vue';
import QDialogContent from './QdialogContent.vue';
import { SFCWithInstall } from '#/helpers';

QDialogContent.install = (app: App): void => {
  app.component(QDialogContent.name, QDialogContent);
};

export default QDialogContent as SFCWithInstall<App, typeof QDialogContent>;
