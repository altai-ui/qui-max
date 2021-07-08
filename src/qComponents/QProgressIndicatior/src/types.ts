import type { App, ComponentPublicInstance, Ref } from 'vue';

export interface QProgressIndicatior {
  isStarted: Ref<boolean>;
  progress: Ref<number>;
  start: () => void;
  set: (value: number) => void;
  inc: (value: number) => void;
  done: () => void;
  forceDone: () => void;
}

export interface QProgressIndicatiorPluginOptions {
  stackable: boolean;
  trickle: boolean;
  trickleSpeed: number;
  onMounted?: (
    containerComponent: ComponentPublicInstance,
    containerApp: App<Element>
  ) => void;
}
