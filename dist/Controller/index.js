"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PERMISSION_1 = __importDefault(require("./PERMISSION"));
const PARTY_1 = __importDefault(require("./PARTY"));
const USER_1 = __importDefault(require("./USER"));
const GUEST_1 = __importDefault(require("./GUEST"));
class Controller {
    constructor() {
        this.USER = USER_1.default;
        this.PERMISSION = PERMISSION_1.default;
        this.PARTY = PARTY_1.default;
        this.GUEST = GUEST_1.default;
    }
}
exports.default = Controller;
