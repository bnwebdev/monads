import { Monad } from "../Monad";
import { Transformer } from "../types";
export declare class Maybe<T> extends Monad<T | null | undefined> {
    run<U>(transformer: Transformer<T, U | undefined | null>): Maybe<U>;
}
