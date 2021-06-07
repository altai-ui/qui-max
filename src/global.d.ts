declare type Nullable<T> = T | null;
declare type SFCWithInstall<R, T> = T & { install(app: R): void };
