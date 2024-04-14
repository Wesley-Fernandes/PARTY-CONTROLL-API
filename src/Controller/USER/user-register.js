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
exports.register = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../../Utils/response-error");
const bcrypt_1 = require("bcrypt");
const Config_1 = __importDefault(require("../../Config"));
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(4),
});
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name } = registerSchema.parse(req.body);
            const have_permission = yield Config_1.default.DB.permission.findUnique({
                where: {
                    email,
                },
                select: {
                    job: true,
                },
            });
            if (!have_permission) {
                return res.status(401).json({ error: "Não têm permissão." });
            }
            const user_exist = yield Config_1.default.DB.user.findUnique({
                where: { email },
                select: {
                    id: true,
                },
            });
            if (user_exist) {
                return res.status(401).json({ error: "Usuario já existe." });
            }
            const salt = (0, bcrypt_1.genSaltSync)(12);
            const hash = (0, bcrypt_1.hashSync)(password, salt);
            const new_user = yield Config_1.default.DB.user.create({
                data: {
                    email,
                    name,
                    password: hash,
                    job: have_permission.job,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            });
            return res.status(201).json(new_user);
        }
        catch (error) {
            (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.register = register;
