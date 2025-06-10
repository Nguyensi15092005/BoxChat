import { NextFunction, Request, Response } from "express";
import RoomsChat from "../models/rooms-chat.model";

export const isAccess = async (req: Request, res:Response, next: NextFunction)=>{
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;

    const existUserInRoomchat = await RoomsChat.findOne({
        _id: roomChatId,
        "users.user_id": userId,
        deleted: false
    })

    if(existUserInRoomchat){
        next()
    }
    else{
        res.redirect("/");
    }


}