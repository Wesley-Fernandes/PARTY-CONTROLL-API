import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.string().min(4).transform(Number),
	SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env);
