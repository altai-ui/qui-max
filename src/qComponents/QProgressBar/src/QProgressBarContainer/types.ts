import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/types';

export type QProgressBarContainerPropIsStarted = Ref<boolean>;
export type QProgressBarContainerPropProgress = Ref<Nullable<number>>;

export interface QProgressBarContainerProps {
  isStarted: QProgressBarContainerPropIsStarted;
  progress: QProgressBarContainerPropProgress;
}

export interface QProgressBarContainerInstance {
  classes: ComputedRef<Record<string, boolean>>;
  styles: ComputedRef<Record<string, string>>;
}
