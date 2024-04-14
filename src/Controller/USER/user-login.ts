import type { Request, Response } from "express";
import { z } from "zod";
import { compareSync } from "bcrypt";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";
import { createJWT } from "../../Utils/createJWT";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = loginSchema.parse(req.body);

		const user = await Config.DB.user.findUnique({
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

		if (compareSync(password, user.password) === false) {
			return res.status(401).json({ error: "Dados não batem." });
		}

		const token = createJWT({ id: user.id, job: user.job });

		const response = {
			name: user.name,
			picture: user.picture,
			token,
		};

		return res.status(200).json(response);
	} catch (error) {
		returnError({ error, response: res });
	}
}
