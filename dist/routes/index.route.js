"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const user_route_1 = require("./user.route");
const user_midleware_1 = require("../middlewares/user.midleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const box_chat_route_1 = require("./box-chat.route");
const chat_route_1 = require("./chat.route");
const room_chat_routes_1 = require("./room-chat.routes");
const Routes = (app) => {
    app.use(user_midleware_1.userMiddleware);
    app.use("/", dashboard_route_1.dashboardRoutes);
    app.use("/user", user_route_1.userRoutes);
    app.use("/box-chat", auth_middleware_1.authMiddleware, box_chat_route_1.boxChatRoutes);
    app.use("/chat", auth_middleware_1.authMiddleware, chat_route_1.chatRoutes);
    app.use("/room-chat", auth_middleware_1.authMiddleware, room_chat_routes_1.roomChatRoutes);
};
exports.default = Routes;
