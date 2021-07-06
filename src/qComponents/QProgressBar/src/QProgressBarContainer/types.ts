import type { Ref, VNode } from 'vue';

export type QProgressBarContainerPropIsShown = Ref<boolean>;
export type QProgressBarContainerPropIsStarted = Ref<boolean>;
export type QProgressBarContainerPropProgress = Ref<number>;

export interface QProgressBarContainerProps {
  isShown: QProgressBarContainerPropIsShown;
  isStarted: QProgressBarContainerPropIsStarted;
  progress: QProgressBarContainerPropProgress;
}

export type QProgressBarContainerInstance = () => VNode;
