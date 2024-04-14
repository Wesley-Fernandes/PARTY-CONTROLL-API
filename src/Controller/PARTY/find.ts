import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const partySchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});
export async function find(req: Request, res: Response) {
	try {
		const { id } = partySchema.parse(req.params);

		const party = await Config.DB.party.findUnique({
			where: { id },
			select: {
				apt: true,
				condominum: true,
				end: true,
				start: true,
				id: true,
				guests: true,
			},
		});

		if (!party)
			return res
				.status(404)
				.json({ message: "Festa não existe ou foi apagada." });

		return res.status(200).json(party);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
