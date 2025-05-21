import { Router } from "express";

import * as validate from "../validates/user";
import * as controller from "../controller/user.controller";
const routes: Router= Router();

routes.get("/login", controller.login);

routes.get("/register", controller.register);

routes.post(
    "/register", 
    validate.registerValidate,
    controller.registerPost
);




export const userRoutes: Router = routes;