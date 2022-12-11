"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = void 0;
const Monad_1 = require("../Monad");
class Maybe extends Monad_1.Monad {
    run(transformer) {
        if (this.data === null || this.data === undefined) {
            return new Maybe(null);
        }
        return this.runWith(transformer, Maybe);
    }
    async vow() {
        return new Maybe(await this.value);
    }
}
exports.Maybe = Maybe;
