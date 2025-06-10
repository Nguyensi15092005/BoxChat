import { Router } from "express";

import * as controller from "../controller/chat.controller";
import { isAccess } from "../middlewares/chat.middleware";
const routes: Router= Router();


routes.get("/:roomChatId",isAccess, controller.chat);

routes.get("/room-chat/:roomChatId",isAccess, controller.roomChat);



export const chatRoutes: Router = routes;