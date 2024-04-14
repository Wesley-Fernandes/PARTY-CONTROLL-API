import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const permissionSchema = z.object({
	email: z.string().email(),
	job: z.enum(["ADMIN", "DEV", "USER"]),
});
export async function create(req: Request, res: Response) {
	try {
		const { email, job } = permissionSchema.parse(req.body);

		const permission_exist = await Config.DB.permission.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});

		if (permission_exist) {
			return res.status(201).json({ error: "Permissão já existe." });
		}

		await Config.DB.permission.create({
			data: {
				email,
				job,
			},
		});

		return res.status(201).json({ message: "Criado com sucesso." });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
