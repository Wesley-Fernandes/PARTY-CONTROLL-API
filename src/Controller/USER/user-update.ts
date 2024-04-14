import type { Request, Response } from "express";
import { ObjectId } from "mongodb/src/bson";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const registerSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});

export async function update(req: Request, res: Response) {
	try {
		const { id } = registerSchema.parse(req.params);

		const user = await Config.DB.user.findUnique({
			where: {
				id,
			},
			select: {
				email: true,
				name: true,
				id: true,
				picture: true,
				job: true,
			},
		});

		if (user) return res.status(200).json(user);

		return res.status(404).json({ error: "Usuario não existe." });
	} catch (error) {
		returnError({ error, response: res });
	}
}
