import { Router } from "express";

import * as controller from "../controller/user.controller";
const routes: Router= Router();

routes.get("/login", controller.login);

routes.get("/register", controller.register);



export const userRoutes: Router = routes;