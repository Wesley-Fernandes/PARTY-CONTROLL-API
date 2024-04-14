import Express from "express";
import Routes from "../Routes";
import swaggerUi from "swagger-ui-express";
import * as swagger from "./swagger.json";
import Config from ".";

export class Server {
	private server = Express();
	private routes = new Routes();

	constructor() {
		this.server.use(Express.json());
		this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
		this.server.use("/api", this.routes.router);
	}

	start() {
		this.server.listen(Config.ENV.PORT, () => {
			console.log(`Server listen on PORT: ${Config.ENV.PORT}`);
		});
	}
}
