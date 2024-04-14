"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const USER_1 = require("./USER");
const PERMISSION_1 = require("./PERMISSION");
const PARTY_1 = require("./PARTY");
const GUEST_1 = require("./GUEST");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.user = new USER_1.USER();
        this.permission = new PERMISSION_1.PERMISSION();
        this.party = new PARTY_1.PARTY();
        this.guest = new GUEST_1.GUEST();
        this.router.use("/user", this.user.routes);
        this.router.use("/permission", this.permission.routes);
        this.router.use("/party", this.party.routes);
        this.router.use("/guest", this.guest.routes);
    }
}
exports.default = Routes;
