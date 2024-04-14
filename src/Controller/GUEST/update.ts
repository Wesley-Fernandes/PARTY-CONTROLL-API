import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const guestSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});

const guestDataSchema = z.object({
	arrive: z.date().optional(),
	leave: z.date().optional(),
	name: z.string().optional(),
});

export async function update(req: Request, res: Response) {
	try {
		const { id } = guestSchema.parse(req.params);
		const { arrive, leave, name } = guestDataSchema.parse(req.body);

		const archive = await Config.DB.guest.update({
			where: {
				id,
			},
			data: {
				arrive,
				leave,
				name,
			},
		});

		return res.status(200).json(archive);
		
	} catch (error) {
		return returnError({ error, response: res });
	}
}
