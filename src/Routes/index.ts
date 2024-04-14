import { Router } from "express";
import { USER } from "./USER";
import { PERMISSION } from "./PERMISSION";
import { PARTY } from "./PARTY";
import { GUEST } from "./GUEST";

class Routes {
	public router = Router();
	private user = new USER();
	private permission = new PERMISSION();
	private party = new PARTY();
	private guest = new GUEST();

	constructor() {
		this.router.use("/user", this.user.routes);
		this.router.use("/permission", this.permission.routes);
		this.router.use("/party", this.party.routes);
		this.router.use("/guest", this.guest.routes);
	}
}

export default Routes;
