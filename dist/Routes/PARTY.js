"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTY = void 0;
const express_1 = require("express");
const Controller_1 = __importDefault(require("../Controller"));
class PARTY {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.controll = new Controller_1.default();
        this.routes.post("/", this.controll.PARTY.create);
        this.routes.post("/all", this.controll.PARTY.all);
        this.routes.get("/:id", this.controll.PARTY.find);
        this.routes.delete("/:id", this.controll.PARTY.erase);
        this.routes.patch("/:id", this.controll.PARTY.update);
    }
}
exports.PARTY = PARTY;
