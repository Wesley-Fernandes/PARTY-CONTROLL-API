import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const partySchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});

const bodySchema = z.object({
	condominum: z.string().optional(),
	end: z.date().optional(),
	start: z.date().optional(),
	apt: z.string().optional(),
});
export async function update(req: Request, res: Response) {
	try {
		const { id } = partySchema.parse(req.params);
		const { apt, condominum, end, start } = bodySchema.parse(req.body);

		await Config.DB.party.update({
			where: { id },
			data: {
				apt,
				condominum,
				end,
				start,
			},
		});

		return res.status(200).json({ message: "Festa deletada." });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
