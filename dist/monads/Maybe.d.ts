import { Monad } from "../Monad";
import { Transformer } from "../types";
export declare class Maybe<T> extends Monad<T | null | undefined> {
    run<U>(transformer: Transformer<Exclude<T, null | undefined>, U | undefined | null>): Maybe<U>;
    vow(): Promise<Maybe<Awaited<T>>>;
}
