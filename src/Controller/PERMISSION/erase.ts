import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const permissionSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});
export async function erase(req: Request, res: Response) {
	try {
		const { id } = permissionSchema.parse(req.params);

		const permission_exist = await Config.DB.permission.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});

		if (!permission_exist) {
			return res.status(201).json({ error: "Permissão não existe." });
		}

		await Config.DB.permission.delete({
			where: { id },
		});

		return res.status(201).json({ message: "Deletado com sucesso." });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
