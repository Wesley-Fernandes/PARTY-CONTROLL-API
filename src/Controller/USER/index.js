"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_test_1 = require("./user-test");
const user_register_1 = require("./user-register");
const user_find_1 = require("./user-find");
const user_login_1 = require("./user-login");
const user_update_1 = require("./user-update");
const user_all_1 = require("./user-all");
exports.default = { test: user_test_1.test, register: user_register_1.register, find: user_find_1.find, login: user_login_1.login, update: user_update_1.update, all: user_all_1.all };
