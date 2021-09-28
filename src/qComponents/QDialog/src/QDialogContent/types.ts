import type { Nullable } from '#/helpers';

export interface QDialogContentProps {
  title: Nullable<string>;
  hideCloseButton: Nullable<boolean>;
}

export interface QDialogContentInstance {
  handleCloseBtnClick: () => void;
}
