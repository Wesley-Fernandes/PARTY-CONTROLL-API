import { Router } from "express";
import Controller from "../Controller";

export class USER {
	public readonly routes = Router();
	public controll = new Controller();
	constructor() {
		this.routes.post("/register", this.controll.USER.register);
		this.routes.post("/login", this.controll.USER.login);
		this.routes.get("/:id", this.controll.USER.find);
		this.routes.get("/", this.controll.USER.all);
	}
}
