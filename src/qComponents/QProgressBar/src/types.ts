import type { App, ComponentPublicInstance, Ref } from 'vue';

export interface QProgressBar {
  isStarted: Ref<boolean>;
  progress: Ref<number>;
  start: () => void;
  set: (value: number) => void;
  inc: (value: number) => void;
  done: () => void;
  forceDone: () => void;
}

export interface QProgressBarPluginOptions {
  stackable: boolean;
  trickle: boolean;
  trickleSpeed: number;
  onMounted?: (
    containerComponent: ComponentPublicInstance,
    containerApp: App<Element>
  ) => void;
}
