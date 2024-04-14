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
exports.update = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../../Utils/response-error");
const Config_1 = __importDefault(require("../../Config"));
const partySchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-f]{24}$/),
});
const bodySchema = zod_1.z.object({
    condominum: zod_1.z.string().optional(),
    end: zod_1.z.date().optional(),
    start: zod_1.z.date().optional(),
    apt: zod_1.z.string().optional(),
});
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = partySchema.parse(req.params);
            const { apt, condominum, end, start } = bodySchema.parse(req.body);
            yield Config_1.default.DB.party.update({
                where: { id },
                data: {
                    apt,
                    condominum,
                    end,
                    start,
                },
            });
            return res.status(200).json({ message: "Festa deletada." });
        }
        catch (error) {
            return (0, response_error_1.returnError)({ error, response: res });
        }
    });
}
exports.update = update;
