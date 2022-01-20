import { ComponentPublicInstance, Ref } from 'vue';

export type Fn = () => void;
export type VueInstance = ComponentPublicInstance;
export type MaybeRef<T> = T | Ref<T>;
export type MaybeElementRef = MaybeRef<
  HTMLElement | SVGElement | VueInstance | undefined | null
>;
