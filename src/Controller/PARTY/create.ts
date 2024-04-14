import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const partySchema = z.object({
	condominum: z.string().min(3),
	apt: z.string(),
	start: z.string().datetime(),
	end: z.string().datetime(),
});

export async function create(req: Request, res: Response) {
	try {
		const { apt, condominum, end, start } = partySchema.parse(req.body);

		const party = await Config.DB.party.create({
			data: {
				apt,
				condominum,
				end,
				start,
			},
			select: {
				id: true,
			},
		});

		return res.status(201).json({ id: party.id });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
