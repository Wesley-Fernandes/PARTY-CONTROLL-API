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
exports.find = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../../Utils/response-error");
const Config_1 = __importDefault(require("../../Config"));
const registerSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-f]{24}$/),
});
function find(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = registerSchema.parse(req.params);
            const user = yield Config_1.default.DB.user.findUnique({
                where: {
                    id,
                },
                select: {
                    email: true,
                    name: true,
                    id: true,
                    picture: true,
                    job: true,
                },
            });
            if (user)
                return res.status(200).json(user);
            return res.status(404).json({ error: "Usuario não existe." });
        }
        catch (error) {
            (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.find = find;
