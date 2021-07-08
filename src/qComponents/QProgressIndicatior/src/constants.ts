import type { InjectionKey } from 'vue';

export const HIDE_ANIMATION_IN_MS = 800;
export const TRANSFORM_ANIMATION_IN_MS = 400;
export const PROGRESS_INDICATIOR_INJECTION_KEY: InjectionKey<string> = Symbol(
  'QProgressIndicatior'
);
