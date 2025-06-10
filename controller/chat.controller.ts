import { Request, Response } from "express";
import { chatSocket } from "../socket/chat";
import Chat from "../models/chat.model";
import User from "../models/user.model";
import RoomsChat from "../models/rooms-chat.model";

// [GET] /chat/:roomChatId
export const chat = async (req: Request, res: Response) => {
    try {
        const roomChatId = req.params.roomChatId;
        const userid = res.locals.user.id;
        // socket
        chatSocket(req, res);
        // socket

        const chats = await Chat.find({
            rom_chat_id: roomChatId,
            deleted: false
        })

        for (const chat of chats) {
            const inforUser = await User.findOne({
                _id: chat.user_id
            }).select("fullName");

            chat["inforUser"] = inforUser;
        }

        // lấy ra tên người nhắn
        const user = await User.findOne({
            'friendList.room_chat_id': req.params.roomChatId, 
            _id: {$ne: userid}
        });

        res.render("pages/chat/index", {
            pageTitle: "Nhắn tin",
            chats: chats,
            userFriend : user
        })
    } catch (error) {
        console.log(error)
        req.flash("error", "Lỗi");
        res.redirect("/box-chat/fiends")
    }
}

export const roomChat = async (req: Request, res: Response) => {
    try {
        const roomChatId = req.params.roomChatId;
        const userid = res.locals.user.id;
        // socket
        chatSocket(req, res);
        // socket

        const chats = await Chat.find({
            rom_chat_id: roomChatId,
            deleted: false
        })

        for (const chat of chats) {
            const inforUser = await User.findOne({
                _id: chat.user_id
            }).select("fullName");

            chat["inforUser"] = inforUser;
        }


        // lấy ra tên phòng chat
        const room = await RoomsChat.findOne({
            _id: roomChatId
        }).select("title")

        res.render("pages/chat/room-chat", {
            pageTitle: "nhắn tin theo phòngg",
            chats: chats,
            room: room
        })
    } catch (error) {
        console.log(error)
        req.flash("error", "Lỗi");
        res.redirect("/box-chat/fiends")
    }
}