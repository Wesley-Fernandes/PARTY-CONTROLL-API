import { Router } from "express";
import Controller from "../Controller";
import { middlwareNormal } from "../Config/middleware";

export class GUEST {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/:id", middlwareNormal, this.controll.GUEST.create);
		this.routes.get("/:id", middlwareNormal, this.controll.GUEST.find);
		this.routes.delete("/:id", middlwareNormal, this.controll.GUEST.erase);
		this.routes.patch("/:id", middlwareNormal, this.controll.GUEST.update);
	}
}
