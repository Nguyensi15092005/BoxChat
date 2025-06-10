import { socketIo } from '../socket/socket';
import { Request, Response } from "express";
import User from "../models/user.model";


// [GET] /box-chat/not-friends
export const notfriends = async (req: Request, res: Response) => {
    socketIo(res);
    try {
        const userId: string = res.locals.user.id; //id A
        const myUserId = await User.findOne({
            _id: userId
        })//B
        const requestFriends = myUserId.requestFriends;
        const acceptFriends = myUserId.acceptFriends;
        const friendList = myUserId.friendList.map(item => item.user_id);
        const users = await User.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: requestFriends } },
                { _id: { $nin: acceptFriends } },
                { _id: { $nin: friendList } }
            ],
            deleted: false,
            status: "active"
        }).select("id fullName avatar");
        res.render("pages/box-chat/not-friends", {
            pageTitle: "Danh sách người dùng",
            users: users
        })
    } catch (error) {

    }
}

// [GET] /box-chat/request
export const request = async (req: Request, res: Response) => {
    try {
        socketIo(res);
        const userId: string = res.locals.user.id; //id A
        const myUserId = await User.findOne({
            _id: userId
        });//B
        const requestFriends = myUserId.requestFriends;
        const users = await User.find({
            _id: { $in: requestFriends },
            deleted: false,
            status: "active"
        }).select("id avatar fullName");
        res.render("pages/box-chat/request", {
            pageTitle: "Lời mời đã gữi",
            users: users
        });
    } catch (error) {

    }
}

// [GET] /box-chat/request
export const accepts = async (req: Request, res: Response) => {
    try {
        socketIo(res);
        const userId: string = res.locals.user.id; //id A
        const myUserId = await User.findOne({
            _id: userId
        });//B
        const acceptFriends = myUserId.acceptFriends;
        const users = await User.find({
            _id: { $in: acceptFriends },
            deleted: false,
            status: "active"
        }).select("id avatar fullName");
        res.render("pages/box-chat/accept", {
            pageTitle: "Lời mời kết bạn ",
            users: users
        });
    } catch (error) {

    }
}

// [GET] /box-chat/friends
export const friends = async (req: Request, res: Response) => {
    try {
        socketIo(res);
        const userId: string = res.locals.user.id; //id A
        const myUserId = await User.findOne({
            _id: userId
        });//B
        const friendListId = myUserId.friendList.map(friend => friend.user_id);
        const users = await User.find({
            _id: { $in: friendListId },
            deleted: false,
            status: "active"
        }).select("id avatar fullName statusOnline");

        for (const user of users) {
            const infoFriend = myUserId.friendList.find(friend => friend.user_id == user.id);
            user["infoFriend"] = infoFriend;
        }

        res.render("pages/box-chat/friends", {
            pageTitle: "Danh sách bạn bè",
            users: users
        });
    } catch (error) {

    }
}

