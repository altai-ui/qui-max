import type { Ref, VNode } from 'vue';

export type QProgressIndicatiorContainerPropIsShown = Ref<boolean>;
export type QProgressIndicatiorContainerPropIsStarted = Ref<boolean>;
export type QProgressIndicatiorContainerPropProgress = Ref<number>;

export interface QProgressIndicatiorContainerProps {
  isShown: QProgressIndicatiorContainerPropIsShown;
  isStarted: QProgressIndicatiorContainerPropIsStarted;
  progress: QProgressIndicatiorContainerPropProgress;
}

export type QProgressIndicatiorContainerInstance = () => VNode;
