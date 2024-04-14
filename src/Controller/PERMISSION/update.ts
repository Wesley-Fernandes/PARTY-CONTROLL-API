import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const permissionSchema = z.object({
	job: z.enum(["ADMIN", "DEV", "USER"]),
});

const paramSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});
export async function update(req: Request, res: Response) {
	try {
		const { id } = paramSchema.parse(req.params);
		const { job } = permissionSchema.parse(req.body);

		await Config.DB.permission.update({
			where: {
				id,
			},
			data: {
				job,
			},
		});

		return res.status(200).json({ message: "Atualizado com sucesso!" });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
