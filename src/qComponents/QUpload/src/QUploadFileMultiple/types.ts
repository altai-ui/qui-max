import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { QUploadFile } from '../types';

export type QUploadFileMultiplePropValue = Nullable<QUploadFile[]>;

export interface QUploadFileMultipleProps {
  value: QUploadFileMultiplePropValue;
  isDisabled: Nullable<boolean>;
  isClearable: Nullable<boolean>;
  textUploadedFiles: Nullable<string>;
}

export interface QUploadFileMultipleInstance {
  classes: ComputedRef<Record<string, boolean>>;
  title: ComputedRef<string>;
  fileList: ComputedRef<
    {
      file: QUploadFile;
      isLoading: boolean;
      barStyle: Record<string, string>;
    }[]
  >;
  handleRemoveAllFilesBtnClick: () => void;
  handleRemoveFileBtnClick: (fileId: string) => void;
  handleAbortUploadingBtnClick: (fileId: string) => void;
}
