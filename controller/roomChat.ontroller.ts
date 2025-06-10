import { Request, Response } from "express";
import User from "../models/user.model";
import RoomsChat from "../models/rooms-chat.model";

export const index = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.id;
        const roomsChat= await RoomsChat.find({
            typeRome: "group",
            'users.user_id': userId,
            deleted: false
        })
        res.render("pages/room-chat/index", {
            pageTitle: "Phòng chát",
            roomsChat: roomsChat
        })
    } catch (error) {

    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const friendList = res.locals.user.friendList;
        for (const friend of friendList) {
            const infoFriend = await User.findOne({
                _id: friend.user_id,
                deleted: false
            }).select("fullName avatar");
            friend["infoFriend"] = infoFriend;
        }
        res.render("pages/room-chat/create", {
            pageTitle: "Tạo phòng",
            friendList: friendList
        })
    } catch (error) {

    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const title: string = req.body.title;
        const usersId = req.body.userId;

        const dataRoomchat = {
            title: title,
            typeRome: "group",
            users: []
        }

        for (const userId of usersId) {
            dataRoomchat.users.push({
                user_id: userId,
                role: "user"
            })
        }
        dataRoomchat.users.push({
            user_id: res.locals.user.id,
            role: "superAdmin"
        })
        const roomchat = new RoomsChat(dataRoomchat);
        await roomchat.save();
        res.redirect(`/chat/room-chat/${roomchat.id}`);
    } catch (error) {

    }
}