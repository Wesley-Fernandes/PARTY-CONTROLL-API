import { Router } from "express";
import Controller from "../Controller";

export class PERMISSION {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.get("/", this.controll.PERMISSION.receive);
		this.routes.post("/", this.controll.PERMISSION.create);
		this.routes.get("/:id", this.controll.PERMISSION.find);
		this.routes.delete("/:id", this.controll.PERMISSION.erase);
		this.routes.patch("/:id", this.controll.PERMISSION.update);
	}
}
