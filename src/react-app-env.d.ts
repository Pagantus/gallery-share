/// <reference types="react-scripts" />

declare type Nullable<T> = T | null;

declare type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
