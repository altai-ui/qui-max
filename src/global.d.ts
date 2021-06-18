declare type Nullable<T> = T | null;
declare type Nillable<T> = T | null | undefined;
declare type Optional<T> = T | undefined;
declare type SFCWithInstall<R, T> = T & { install(app: R): void };
