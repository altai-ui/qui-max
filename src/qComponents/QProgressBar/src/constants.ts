import type { InjectionKey } from 'vue';

export const ANIMATION_IN_MS = 400;
export const PROGRESS_BAR_INJECTION_KEY: InjectionKey<string> =
  Symbol('QProgressBar');
