import type { ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';
import type { QDrawerAction } from '../constants';

export type QDrawerContentPropBeforeClose = Nullable<
  (action: QDrawerAction) => Promise<boolean>
>;

export interface QDrawerParams {
  title: Nullable<string>;
  info: Nullable<string>;
  confirmButtonText: Nullable<string>;
  cancelButtonText: Nullable<string>;
  beforeClose: Nullable<QDrawerContentPropBeforeClose>;
}

export interface QDrawerContentInstance {
  isActionsVisible: ComputedRef<boolean>;
  handleConfirmClick: () => void;
  handleCancelClick: () => void;
}
