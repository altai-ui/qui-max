import { QDrawerAction } from '@/qComponents';
import { Nullable } from '#/helpers';

export type QDrawerContentPropBeforeClose = Nullable<
  (action: QDrawerAction) => Promise<boolean>
>;

export interface QDrawerContentProps {
  title: Nullable<string>;
  beforeClose: QDrawerContentPropBeforeClose;
}

export interface QDrawerContentInstance {
  handleClose: () => void;
}
