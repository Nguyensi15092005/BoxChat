import { Router } from "express";

import * as controller from "../controller/dashboard.controller";
const routes: Router= Router();

routes.get("/", controller.index);


export const dashboardRoutes: Router = routes;