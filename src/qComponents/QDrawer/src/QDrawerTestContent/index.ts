import type { App } from 'vue';
import QDrawerTestContent from './QDrawerTestContent.vue';
import { SFCWithInstall } from '#/helpers';

QDrawerTestContent.install = (app: App): void => {
  app.component(QDrawerTestContent.name, QDrawerTestContent);
};

export default QDrawerTestContent as SFCWithInstall<
  App,
  typeof QDrawerTestContent
>;
