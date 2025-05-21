import { Router } from "express";

import * as controller from "../controller/chat.controller";
const routes: Router= Router();

routes.get("/", controller.index);





export const chatRoutes: Router = routes;