"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("../Routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger = __importStar(require("./swagger.json"));
const _1 = __importDefault(require("."));
class Server {
    constructor() {
        this.server = (0, express_1.default)();
        this.routes = new Routes_1.default();
        this.server.use(express_1.default.json());
        this.server.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger));
        this.server.use("/api", this.routes.router);
    }
    start() {
        this.server.listen(_1.default.ENV.PORT, () => {
            console.log(`Server listen on PORT: ${_1.default.ENV.PORT}`);
        });
    }
}
exports.Server = Server;
