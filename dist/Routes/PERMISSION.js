"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION = void 0;
const express_1 = require("express");
const Controller_1 = __importDefault(require("../Controller"));
class PERMISSION {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.controll = new Controller_1.default();
        this.routes.get("/", this.controll.PERMISSION.receive);
        this.routes.post("/", this.controll.PERMISSION.create);
        this.routes.get("/:id", this.controll.PERMISSION.find);
        this.routes.delete("/:id", this.controll.PERMISSION.erase);
        this.routes.patch("/:id", this.controll.PERMISSION.update);
    }
}
exports.PERMISSION = PERMISSION;
