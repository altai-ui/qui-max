import { Ref, ComputedRef } from 'vue';

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
  processFile: ({ target }: MouseEvent) => void;
  handleUploadClick: () => void;
  handleClearAll: () => void;
  handleClear: (fileId: string) => void;
  handleAbort: (fileId: string) => void;
}

export interface QUploadDropZoneProps {
  hasValue: Nullable<boolean>;
  isMultiple: Nullable<boolean>;
  isDisabled: Nullable<boolean>;
  isLoading: Nullable<boolean>;
  textUploadFile: Nullable<string>;
  textReplaceFile: Nullable<string>;
  textLoadingFile: Nullable<string>;
}

export interface QUploadDropZoneInstance {
  classes: ComputedRef<Record<string, boolean>>;
  icon: ComputedRef<string>;
  text: ComputedRef<string>;
  handleDrop: (arg0: DragEvent) => void;
  handleDragover: () => void;
  handleDragleave: () => void;
}

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
  fileList: {
    file: QUploadFile;
    isLoading: boolean;
    barStyle: Record<string, string>;
  }[];
  handleRemoveAllFilesBtnClick: () => void;
  handleRemoveFileBtnClick: (fileId: string) => void;
  handleAbortUploadingBtnClick: (fileId: string) => void;
}

export interface QUploadFileSinglePropValue {
  name?: string;
  loading?: number;
}

export interface QUploadFileSingleProps {
  value: QUploadFileSinglePropValue;
  isLoading: Nullable<boolean>;
  isDisabled: Nullable<boolean>;
  isClearable: Nullable<boolean>;
}

export interface QUploadFileSingleInstance {
  barStyle: ComputedRef<{ width?: string }>;
  fileName: ComputedRef<string>;
  handleRemoveFileBtnClick: () => void;
  handleAbortUploadingBtnClick: () => void;
}
