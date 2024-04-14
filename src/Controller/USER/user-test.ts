import type { Request, Response } from "express";
import { z } from "zod";
import { returnError } from "../../Utils/response-error";

const testSchema = z.object({
	id: z.string().min(3),
});
export async function test(req: Request, res: Response) {
	try {
		const { id } = testSchema.parse(req.params);
		return res.status(200).json({ status: true, id });
	} catch (error) {
		returnError({ error, response: res });
	}
}
