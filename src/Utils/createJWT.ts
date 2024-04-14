import { sign } from "jsonwebtoken";
import Config from "../Config";
import { z } from "zod";

const createJWTSchema = z.object({
	id: z.string().regex(/^[0-9a-f]{24}$/),
	job: z.enum(["ADMIN", "DEV", "USER"]),
});

interface props {
	id: string;
	job: "ADMIN" | "DEV" | "USER";
}
export const createJWT = (props: props) => {
	const { id, job } = createJWTSchema.parse(props);
	const token = sign({ id, job }, Config.ENV.SECRET, { expiresIn: "12h" });
	return token;
};