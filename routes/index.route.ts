import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { userRoutes } from './user.route';
import { userMiddleware } from '../middlewares/user.midleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { boxChatRoutes } from './box-chat.route';
import { chatRoutes } from './chat.route';
import { roomChatRoutes } from './room-chat.routes';

const Routes = (app: Express): void =>{
    app.use(userMiddleware);

    app.use("/", dashboardRoutes);

    app.use("/user", userRoutes);

    app.use("/box-chat", authMiddleware, boxChatRoutes);

    app.use("/chat", authMiddleware, chatRoutes);

    app.use("/room-chat", authMiddleware, roomChatRoutes);






}
export default Routes;