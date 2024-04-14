import { Router } from "express";
import Controller from "../Controller";
import { middlwareNormal } from "../Config/middleware";

export class PARTY {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/",middlwareNormal, this.controll.PARTY.create);
		this.routes.post("/all",middlwareNormal, this.controll.PARTY.all);
		this.routes.get("/:id",middlwareNormal, this.controll.PARTY.find);
		this.routes.delete("/:id",middlwareNormal, this.controll.PARTY.erase);
		this.routes.patch("/:id",middlwareNormal, this.controll.PARTY.update);
	}
}
