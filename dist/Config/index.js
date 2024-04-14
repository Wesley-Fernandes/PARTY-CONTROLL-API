"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_class_1 = require("./server-class");
const env_variables_1 = require("./env-variables");
const database_1 = require("./database");
exports.default = { Server: server_class_1.Server, ENV: env_variables_1.ENV, DB: database_1.DB };
