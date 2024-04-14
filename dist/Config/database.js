"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.DB = {
    user: prisma.user,
    guest: prisma.guest,
    party: prisma.party,
    permission: prisma.permission,
};
