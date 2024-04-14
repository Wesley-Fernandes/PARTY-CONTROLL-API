import { Router } from "express";
import Controller from "../Controller";

export class GUEST {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/", this.controll.GUEST.create);
		this.routes.get("/:id", this.controll.GUEST.find);
		this.routes.delete("/:id", this.controll.GUEST.erase);
		this.routes.patch("/:id", this.controll.GUEST.update);
	}
}
