"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
const express_1 = require("express");
const Controller_1 = __importDefault(require("../Controller"));
class USER {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.controll = new Controller_1.default();
        this.routes.post("/register", this.controll.USER.register);
        this.routes.post("/login", this.controll.USER.login);
        this.routes.get("/:id", this.controll.USER.find);
        this.routes.get("/", this.controll.USER.all);
    }
}
exports.USER = USER;
