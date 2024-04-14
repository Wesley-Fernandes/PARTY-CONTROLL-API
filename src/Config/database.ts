import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DB = {
	user: prisma.user,
	guest: prisma.guest,
	party: prisma.party,
	permission: prisma.permission,
};
