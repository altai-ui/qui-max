import { Nullable } from '#/helpers';

export interface QDrawerContentProps {
  title: Nullable<string>;
  distinguishCancelAndClose?: Nullable<boolean>;
}

export interface QDrawerContentInstance {
  handleCloseBtnClick: () => void;
}
