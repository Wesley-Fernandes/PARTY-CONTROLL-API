import { Router } from "express";
import Controller from "../Controller";
import { middlwareADMIN, middlwareNormal } from "../Config/middleware";

export class PERMISSION {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.get("/", middlwareADMIN, this.controll.PERMISSION.receive);
		this.routes.post("/", middlwareADMIN, this.controll.PERMISSION.create);
		this.routes.get("/:id", middlwareNormal, this.controll.PERMISSION.find);
		this.routes.delete("/:id", middlwareADMIN, this.controll.PERMISSION.erase);
		this.routes.patch("/:id", middlwareADMIN, this.controll.PERMISSION.update);
	}
}
