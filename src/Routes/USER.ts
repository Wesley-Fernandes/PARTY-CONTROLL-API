import { Router } from "express";
import Controller from "../Controller";
import { middlwareADMIN } from "../Config/middleware";

export class USER {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/register", this.controll.USER.register);
		this.routes.post("/login", this.controll.USER.login);
		this.routes.get("/:id", middlwareADMIN, this.controll.USER.find);
		this.routes.get("/", middlwareADMIN, this.controll.USER.all);
	}
}
