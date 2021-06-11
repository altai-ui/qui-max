import { createMessageBox as useMessageBox } from './src';

const QMessageBox = (): void => {};

export { useMessageBox };
export { QMessageBoxContent } from './src/QMessageBoxContent';
export type {
  QMessageBoxContentProps,
  QMessageBoxContentInstance
} from './src/QMessageBoxContent';
export { QMessageBoxAction } from './src/constants';
export type { QMessageBoxOptions } from './src/types';
export default QMessageBox;
