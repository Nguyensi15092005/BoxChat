import { Router } from "express";
import multer from 'multer';
const upload = multer();

import * as validate from "../validates/user";
import * as controller from "../controller/user.controller";
import * as middleware from "../middlewares/uploadClou.middleware";
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
    upload.single("avatar"),
    middleware.uploadSingle,
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

routes.get("/password/otp", controller.otp);

routes.get("/password/otp", controller.otp);

routes.post(
    "/password/otp", 
    validate.otpValidate,
    controller.otpPost
);

routes.get("/password/reset", controller.reset);

routes.post(
    "/password/reset", 
    validate.resetValidate,
    controller.resetPost
);











export const userRoutes: Router = routes;