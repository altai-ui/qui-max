import type { Nullable } from '#/helpers';

export interface QDrawerContentProps {
  title: Nullable<string>;
  hideCloseButton: Nullable<boolean>;
}

export interface QDrawerContentInstance {
  handleCloseBtnClick: () => void;
}
