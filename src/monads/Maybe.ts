import { Monad } from "../Monad";
import { Transformer } from "../types";

export class Maybe<T> extends Monad<T | null | undefined> {
  run<U>(
    transformer: Transformer<Exclude<T, null | undefined>, U | undefined | null>
  ): Maybe<U> {
    if (this.data === null || this.data === undefined) {
      return new Maybe<U>(null);
    }

    return this.runWith(
      transformer as Transformer<T | null | undefined, U | null | undefined>,
      Maybe
    );
  }

  async vow() {
    return new Maybe<Awaited<T>>(await this.value);
  }
}
