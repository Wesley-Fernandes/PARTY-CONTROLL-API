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
exports.receive = void 0;
const response_error_1 = require("../../Utils/response-error");
const Config_1 = __importDefault(require("../../Config"));
function receive(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const permissions = yield Config_1.default.DB.permission.findMany();
            if (!permissions) {
                return res.status(404).json({ message: "Sem permissões." });
            }
            return res.status(201).json(permissions);
        }
        catch (error) {
            return (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.receive = receive;
