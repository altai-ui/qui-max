import { Nullable } from '#/helpers';

export interface QDrawerContentProps {
  title: Nullable<string>;
}

export interface QDrawerContentInstance {
  handleCloseBtnClick: () => void;
}
