import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const guestSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});

export async function find(req: Request, res: Response) {
	try {
		const { id } = guestSchema.parse(req.params);

		const guest = await Config.DB.guest.findUnique({
			where: {
				id,
			},
		});

		return res.status(200).json(guest);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
