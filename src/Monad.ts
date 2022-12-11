import { ConstructorType, Transformer } from "./types";

export abstract class Monad<T> {
  protected data: T;

  constructor(value: T | Monad<T>) {
    if (value instanceof Monad) {
      this.data = value.data;
    } else {
      this.data = value;
    }
  }

  public abstract run<U>(transformer: Transformer<T, U>): any;

  get value() {
    return this.data;
  }

  protected runWith<U, TM extends Monad<T>, UM extends Monad<U>>(
    this: TM,
    transformer: Transformer<T, U>,
    UWrapper: ConstructorType<UM>
  ): UM {
    return new UWrapper(transformer(this.data));
  }
}
