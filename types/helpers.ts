import type { App, ComponentPublicInstance, UnwrapRef } from 'vue';

export type Nullable<T> = T | null;
export type Nillable<T> = T | null | undefined;
export type Optional<T> = T | undefined;
export type SFCWithInstall<T> = T & { install(app: App): void };
export type UnwrappedInstance<T> = Nullable<
  ComponentPublicInstance<UnwrapRef<T>>
>;
export type Enumerable<T> = T | T[];
export type IsArray<T> = T extends unknown[] ? T : never;
export type UnpackArrayType<T> = T extends (infer R)[] ? R : T;

export type ClassValue = Nillable<
  ClassValue[] | Record<string, Nillable<boolean>> | string
>;
