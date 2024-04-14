import type { Request, Response } from "express";
import { date, z } from "zod";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

const partySchema = z.object({
	start: z.string().datetime()
});
export async function all(req: Request, res: Response) {
	try {
		const { start} = partySchema.parse(req.body);
		const nextDay = new Date(start);
		nextDay.setDate(nextDay.getDate() + 1);
		const partys = await Config.DB.party.findMany({
			where: {
				AND: [
					{
						start: {
							lt: nextDay,
						},
						end: {
							gt: start,
						},
					},
				],
			},
		});

		if (!partys)
			return res.status(404).json({ message: "Não existem festas." });

		return res.status(200).json(partys);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
