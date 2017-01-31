export declare type Nullable<T> = T | null | undefined;
export interface Dictionary<TValue> {
    [index: string]: TValue;
}
export interface Constructable<T> {
    new (...args: any[]): T;
    prototype: T;
}
