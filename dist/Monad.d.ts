import { ConstructorType, Transformer } from "./types";
export declare abstract class Monad<T> {
    protected data: T;
    constructor(value: T | Monad<T>);
    abstract run<U>(transformer: Transformer<T, U>): any;
    get value(): T;
    protected runWith<U, TM extends Monad<T>, UM extends Monad<U>>(this: TM, transformer: Transformer<T, U>, UWrapper: ConstructorType<UM>): UM;
}
