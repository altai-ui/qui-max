// import { getCurrentInstance, provide, inject } from 'vue';
// import type { App, Plugin } from 'vue';

import { createMessageBox as useMessageBox } from './src';
// import { MESSAGE_BOX_INJECTION_KEY } from './src/constants';
// import type { QMessageBox, QMessageBoxOptions } from './src/types';

const QMessageBox = (): void => {};

// export type { QMessageBoxId } from './src/types';
export { useMessageBox };
export { QMessageBoxContent } from './src/QMessageBoxContent';
export { QMessageBoxAction } from './src/constants';
export default QMessageBox;

// import type { App } from 'vue';

// import QMessageBox from './src/QMessageBox.vue';

// /* istanbul ignore next */
// QMessageBox.install = (app: App): void => {
//   app.component(QMessageBox.name, QMessageBox);
// };

// export type {
//   QMessageBoxProps,
//   QMessageBoxPropBeforeClose,
//   QMessageBoxInstance
// } from './src/types';
// export default QMessageBox as SFCWithInstall<App, typeof QMessageBox>;
