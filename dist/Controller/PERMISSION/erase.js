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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.erase = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../../Utils/response-error");
const Config_1 = __importDefault(require("../../Config"));
const permissionSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-f]{24}$/),
});
function erase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = permissionSchema.parse(req.params);
            const permission_exist = yield Config_1.default.DB.permission.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            });
            if (!permission_exist) {
                return res.status(201).json({ error: "Permissão não existe." });
            }
            yield Config_1.default.DB.permission.delete({
                where: { id },
            });
            return res.status(201).json({ message: "Deletado com sucesso." });
        }
        catch (error) {
            return (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.erase = erase;
