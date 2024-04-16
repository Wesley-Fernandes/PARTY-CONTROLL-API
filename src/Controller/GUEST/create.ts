import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const guestSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});

const guestDataSchema = z.object({
	name: z.string(),
});
export async function create(req: Request, res: Response) {
	try {
		const { id } = guestSchema.parse(req.params);
		const { name } = guestDataSchema.parse(req.body);

		const guest = await Config.DB.guest.create({
			data: {
				name,
				partyID: id,
			},
		});

		return res.status(201).json(guest);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
