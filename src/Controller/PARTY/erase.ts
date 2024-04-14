import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const partySchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
});
export async function erase(req: Request, res: Response) {
	try {
		const { id } = partySchema.parse(req.params);

		await Config.DB.party.delete({
			where: { id },
		});

		return res.status(200).json({ message: "Festa deletada." });
	} catch (error) {
		return returnError({ error, response: res });
	}
}
