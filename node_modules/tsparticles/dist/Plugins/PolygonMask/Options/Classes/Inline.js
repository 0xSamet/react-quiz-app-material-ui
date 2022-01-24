"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inline = void 0;
const InlineArrangement_1 = require("../../Enums/InlineArrangement");
class Inline {
    constructor() {
        this.arrangement = InlineArrangement_1.InlineArrangement.onePerPoint;
    }
    load(data) {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
exports.Inline = Inline;
