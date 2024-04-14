import type { NextFunction, Request, Response } from "express";
import { VerifyOptions, verify } from "jsonwebtoken";
import Config from ".";
import { z } from "zod";
import { returnError } from "../Utils/response-error";

const middlwareSchema = z.object({
	authorization: z.string(),
});

interface userType {
	id: string;
	job: "ADMIN" | "DEV" | "USER";
}

export const middlwareNormal = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { authorization } = middlwareSchema.parse(req.headers);

		verify(authorization, Config.ENV.SECRET, (error, data) => {
			if (error) {
				returnError({ error, response: res });
			}

			const new_data: userType = data as userType;
			req.user = new_data;
			next();
		});
	} catch (error) {
		return returnError({ error, response: res });
	}
};

export const middlwareDEV = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { authorization } = middlwareSchema.parse(req.headers);

		verify(authorization, Config.ENV.SECRET, (error, data) => {
			if (error) {
				returnError({ error, response: res });
			}

			const new_data: userType = data as userType;
			if (new_data.job !== "DEV") {
				return res.status(401).json({ message: "Sem autorização." });
			}
			req.user = new_data;
			next();
		});
	} catch (error) {
		return returnError({ error, response: res });
	}
};

export const middlwareADMIN = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { authorization } = middlwareSchema.parse(req.headers);

		verify(authorization, Config.ENV.SECRET, (error, data) => {
			if (error) {
				returnError({ error, response: res });
			}

			const new_data: userType = data as userType;

			// biome-ignore lint/correctness/noConstantCondition: <explanation>
			if (new_data.job !== "DEV" || "ADMIN") {
				return res.status(401).json({ message: "Sem autorização." });
			}
			req.user = new_data;
			next();
		});
	} catch (error) {
		return returnError({ error, response: res });
	}
};