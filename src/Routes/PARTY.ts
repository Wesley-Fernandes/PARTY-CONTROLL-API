import { Router } from "express";
import Controller from "../Controller";

export class PARTY {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/", this.controll.PARTY.create);
		this.routes.post("/all", this.controll.PARTY.all);
		this.routes.get("/:id", this.controll.PARTY.find);
		this.routes.delete("/:id", this.controll.PARTY.erase);
		this.routes.patch("/:id", this.controll.PARTY.update);
	}
}
