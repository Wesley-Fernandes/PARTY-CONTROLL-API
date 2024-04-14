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
exports.test = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../../Utils/response-error");
const testSchema = zod_1.z.object({
    id: zod_1.z.string().min(3),
});
function test(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = testSchema.parse(req.params);
            return res.status(200).json({ status: true, id });
        }
        catch (error) {
            (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.test = test;
