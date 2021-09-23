import { Nullable } from '#/helpers';
import { QDialogAction } from '../constants';

export type QDialogContentPropBeforeClose = Nullable<
  (action: QDialogAction) => Promise<boolean>
>;

export interface QDialogContentProps {
  title: Nullable<string>;
  beforeClose: Nullable<QDialogContentPropBeforeClose>;
}

export interface QDialogContentInstance {
  handleClose: () => Promise<void>;
}
