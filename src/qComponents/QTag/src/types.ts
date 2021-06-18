import type { Nullable } from '#/helpers';

export interface QTagProps {
  closable: Nullable<boolean>;
}

export interface QTagInstance {
  handleClose: (event: MouseEvent) => void;
}
