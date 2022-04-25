import { withInstall } from '../helpers';

import Upload from './src/QUpload.vue';

export const QUpload = /* #__PURE__ */ withInstall(Upload);

export type { QUploadProps, QUploadFile, QUploadInstance } from './src/types';
