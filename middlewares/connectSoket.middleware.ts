import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const ConnectSocketMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.tokenUser) {
        global._io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

    }
    next();

}