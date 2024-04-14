declare namespace Express {
	interface Request {
		user: {
			id: string;
			job: "ADMIN" | "DEV" | "USER";
		};
	}
}