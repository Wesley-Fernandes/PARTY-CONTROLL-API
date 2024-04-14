import type { Response } from "express";
import { z } from "zod";

interface props {
	error: unknown | z.ZodError;
	response: Response;
}
export async function returnError({ error, response }: props) {
	if (error instanceof z.ZodError) {
		return response.status(401).json({ error: error.issues });
	}

	return response.status(401).json(error);
}
