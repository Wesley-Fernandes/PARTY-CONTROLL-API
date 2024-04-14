"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUEST = void 0;
const express_1 = require("express");
const Controller_1 = __importDefault(require("../Controller"));
class GUEST {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.controll = new Controller_1.default();
        this.routes.post("/", this.controll.GUEST.create);
        this.routes.get("/:id", this.controll.GUEST.find);
        this.routes.delete("/:id", this.controll.GUEST.erase);
        this.routes.patch("/:id", this.controll.GUEST.update);
    }
}
exports.GUEST = GUEST;
