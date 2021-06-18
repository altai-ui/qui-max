import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QUpload from './src/QUpload.vue';

/* istanbul ignore next */
QUpload.install = (app: App): void => {
  app.component(QUpload.name, QUpload);
};

export type { QUploadProps, QUploadFile, QUploadInstance } from './src/types';
export default QUpload as SFCWithInstall<App, typeof QUpload>;
