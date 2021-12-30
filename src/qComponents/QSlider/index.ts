import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QSlider from './src/QSlider.vue';

QSlider.install = (app: App): void => {
  app.component(QSlider.name, QSlider);
};

export default QSlider as SFCWithInstall<App, typeof QSlider>
