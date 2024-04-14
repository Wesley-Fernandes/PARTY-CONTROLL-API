"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    PORT: zod_1.z.string().min(4).transform(Number),
    SECRET: zod_1.z.string(),
});
exports.ENV = envSchema.parse(process.env);
