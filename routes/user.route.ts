import { Router } from "express";

import * as validate from "../validates/user";
import * as controller from "../controller/user.controller";
const routes: Router= Router();

routes.get("/login", controller.login);

routes.post(
    "/login", 
    validate.loginValidate,
    controller.loginPost
);

routes.get("/register", controller.register);

routes.post(
    "/register", 
    validate.registerValidate,
    controller.registerPost
);

routes.get("/logout", controller.logout);

routes.get("/password/forgot", controller.forgotPassword);

routes.post(
    "/password/forgot", 
    validate.forgotValidate,
    controller.forgotPasswordPost
);





export const userRoutes: Router = routes;