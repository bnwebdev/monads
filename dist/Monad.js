"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monad = void 0;
class Monad {
    data;
    constructor(value) {
        if (value instanceof Monad) {
            this.data = value.data;
        }
        else {
            this.data = value;
        }
    }
    get value() {
        return this.data;
    }
    runWith(transformer, UWrapper) {
        return new UWrapper(transformer(this.data));
    }
}
exports.Monad = Monad;
