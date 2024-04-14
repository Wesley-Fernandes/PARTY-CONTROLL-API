import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const permissionSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});
export async function find(req: Request, res: Response) {
	try {
		const { id } = permissionSchema.parse(req.params);

		const permission = await Config.DB.permission.findUnique({
			where: {
				id,
			},
		});

		if (!permission) {
			return res.status(404).json({ error: "Permissão não existe." });
		}

		return res.status(200).json(permission);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
