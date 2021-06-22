import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

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
