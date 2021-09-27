import type { Nullable } from '#/helpers';

export interface QDialogContentProps {
  title: Nullable<string>;
}

export interface QDialogContentInstance {
  handleClose: () => void;
}
