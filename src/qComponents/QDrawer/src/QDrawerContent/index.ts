import { App } from 'vue';
import QDrawerContent from './src/QDrawerContent.vue';
import { SFCWithInstall } from '#/helpers';

QDrawerContent.install = (app: App): void => {
  app.component(QDrawerContent.name, QDrawerContent);
};

export default QDrawerContent as SFCWithInstall<App, typeof QDrawerContent>;
