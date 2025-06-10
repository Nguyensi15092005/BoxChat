import { Router } from "express";

import * as controller from "../controller/roomChat.ontroller";
const routes: Router= Router();


routes.get('/', controller.index)

routes.get('/create', controller.create)

routes.post('/create', controller.createPost)





export const roomChatRoutes: Router = routes;