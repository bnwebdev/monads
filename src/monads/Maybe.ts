import { Monad } from "../Monad";
import { Transformer } from "../types";

export class Maybe<T> extends Monad<T | null | undefined> {
  run<U>(transformer: Transformer<T, U | undefined | null>): Maybe<U> {
    if (this.data === null || this.data === undefined) {
      return new Maybe<U>(null);
    }

    return this.runWith(
      transformer as Transformer<T | null | undefined, U | null | undefined>,
      Maybe
    );
  }
}
