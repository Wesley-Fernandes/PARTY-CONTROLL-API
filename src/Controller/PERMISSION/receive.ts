import type { Request, Response } from "express";
import { returnError } from "../../Utils/response-error";
import Config from "../../Config";

export async function receive(req: Request, res: Response) {
	try {
		const permissions = await Config.DB.permission.findMany();

		if (!permissions) {
			return res.status(404).json({ message: "Sem permissões." });
		}

		return res.status(201).json(permissions);
	} catch (error) {
		return returnError({ error, response: res });
	}
}
