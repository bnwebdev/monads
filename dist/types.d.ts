export type ConstructorType<T> = new (...args: any[]) => T;
export type Transformer<T, U> = (value: T) => U;
