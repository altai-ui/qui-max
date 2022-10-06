import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QUploadFile {
  id: string;
  name: string;
  loading: Nullable<number>;
}

export type QUploadPropValue = Nullable<QUploadFile | QUploadFile[]>;
export type QUploadPropDirection = 'right' | 'bottom';
export type QUploadPropAccept = Nullable<string | string[]>;

export interface QUploadProps {
  value: QUploadPropValue;
  multiple: Nullable<boolean>;
  direction: QUploadPropDirection;
  limit: Nullable<number>;
  accept: QUploadPropAccept;
  disabled: Nullable<boolean>;
  clearable: Nullable<boolean>;
  validateEvent: Nullable<boolean>;
  textUploadFile: Nullable<string>;
  textReplaceFile: Nullable<string>;
  textLoadingFile: Nullable<string>;
  textUploadedFiles: Nullable<string>;
}

export interface QUploadInstance {
  isDisabled: ComputedRef<boolean>;
  isLoading: ComputedRef<boolean>;
  fileInput: Ref<Nullable<HTMLInputElement>>;
  classes: ComputedRef<Record<string, boolean>>;
  hasValue: ComputedRef<boolean>;
  handleFileChange: ({ target }: MouseEvent) => void;
  processFile: (fileList: Nullable<FileList>) => void;
  handleFileDrop: (dropEvent: DragEvent) => void;
  handleUploadClick: () => void;
  handleClearAll: () => void;
  handleClear: (fileId: string) => void;
  handleAbort: (fileId: string) => void;
}
