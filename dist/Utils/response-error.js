"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = void 0;
const zod_1 = require("zod");
function returnError(_a) {
    return __awaiter(this, arguments, void 0, function* ({ error, response }) {
        if (error instanceof zod_1.z.ZodError) {
            return response.status(401).json({ error: error.issues });
        }
        return response.status(401).json(error);
    });
}
exports.returnError = returnError;
