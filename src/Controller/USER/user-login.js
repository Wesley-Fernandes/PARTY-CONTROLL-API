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
exports.login = void 0;
const zod_1 = require("zod");
const bcrypt_1 = require("bcrypt");
const response_error_1 = require("../../Utils/response-error");
const Config_1 = __importDefault(require("../../Config"));
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const user = yield Config_1.default.DB.user.findUnique({
                where: {
                    email,
                },
                select: {
                    email: true,
                    password: true,
                    name: true,
                    id: true,
                    picture: true,
                    job: true,
                },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuario não existe." });
            }
            if ((0, bcrypt_1.compareSync)(password, user.password) === false) {
                return res.status(401).json({ error: "Dados não batem." });
            }
            return res.status(404).json({
                user: {
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    picture: user.picture,
                    job: user.job,
                },
            });
        }
        catch (error) {
            (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.login = login;
