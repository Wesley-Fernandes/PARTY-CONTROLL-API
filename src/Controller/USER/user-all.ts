import type { Request, Response } from "express";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

export async function all(req: Request, res: Response) {
	try {
		const users = await Config.DB.user.findMany({
			select: {
				email: true,
				name: true,
				id: true,
				picture: true,
				job: true,
			},
		});

		if (users) return res.status(200).json(users);

		return res.status(404).json({ error: "Não existem usuarios." });
	} catch (error) {
		returnError({ error, response: res });
	}
}
