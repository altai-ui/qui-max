import { Nullable } from '#/helpers';

export interface QDrawerParams {
  title: Nullable<string>;
}

export interface QDrawerContentInstance {
  handleDone: () => void;
}
