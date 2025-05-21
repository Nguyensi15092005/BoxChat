import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { userRoutes } from './user.route';
import { chatRoutes } from './chat.route';
import { userMiddleware } from '../middlewares/user.midleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const Routes = (app: Express): void =>{
    app.use(userMiddleware);

    app.use("/", dashboardRoutes);

    app.use("/user", userRoutes);

    app.use("/chat", authMiddleware, chatRoutes);


}
export default Routes;