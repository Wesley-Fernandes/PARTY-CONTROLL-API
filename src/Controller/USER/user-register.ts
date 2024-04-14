import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import { genSaltSync, hashSync } from "bcrypt";
import Config from "../../Config";

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(4),
});

export async function register(req: Request, res: Response) {
	try {
		const { email, password, name } = registerSchema.parse(req.body);

		const have_permission = await Config.DB.permission.findUnique({
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

		const user_exist = await Config.DB.user.findUnique({
			where: { email },
			select: {
				id: true,
			},
		});

		if (user_exist) {
			return res.status(401).json({ error: "Usuario já existe." });
		}

		const salt = genSaltSync(12);
		const hash = hashSync(password, salt);

		const new_user = await Config.DB.user.create({
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
	} catch (error) {
		returnError({ error, response: res });
	}
}
