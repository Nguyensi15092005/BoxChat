import { Router } from "express";

import * as controller from "../controller/box-chat.controller";
const routes: Router= Router();

routes.get("/not-friends", controller.notfriends);

routes.get("/request", controller.request);

routes.get("/accepts", controller.accepts);

routes.get("/friends", controller.friends);





export const boxChatRoutes: Router = routes;