import { App } from 'vue';

import QUpload from './src/QUpload.vue';

/* istanbul ignore next */
QUpload.install = (app: App): void => {
  app.component(QUpload.name, QUpload);
};

export type { QUploadProps, QUploadFile, QUploadInstance } from './src/types';
export default QUpload;
