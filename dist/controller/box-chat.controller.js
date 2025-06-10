"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friends = exports.accepts = exports.request = exports.notfriends = void 0;
const socket_1 = require("../socket/socket");
const user_model_1 = __importDefault(require("../models/user.model"));
const notfriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, socket_1.socketIo)(res);
    try {
        const userId = res.locals.user.id;
        const myUserId = yield user_model_1.default.findOne({
            _id: userId
        });
        const requestFriends = myUserId.requestFriends;
        const acceptFriends = myUserId.acceptFriends;
        const friendList = myUserId.friendList.map(item => item.user_id);
        const users = yield user_model_1.default.find({
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
        });
    }
    catch (error) {
    }
});
exports.notfriends = notfriends;
const request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, socket_1.socketIo)(res);
        const userId = res.locals.user.id;
        const myUserId = yield user_model_1.default.findOne({
            _id: userId
        });
        const requestFriends = myUserId.requestFriends;
        const users = yield user_model_1.default.find({
            _id: { $in: requestFriends },
            deleted: false,
            status: "active"
        }).select("id avatar fullName");
        res.render("pages/box-chat/request", {
            pageTitle: "Lời mời đã gữi",
            users: users
        });
    }
    catch (error) {
    }
});
exports.request = request;
const accepts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, socket_1.socketIo)(res);
        const userId = res.locals.user.id;
        const myUserId = yield user_model_1.default.findOne({
            _id: userId
        });
        const acceptFriends = myUserId.acceptFriends;
        const users = yield user_model_1.default.find({
            _id: { $in: acceptFriends },
            deleted: false,
            status: "active"
        }).select("id avatar fullName");
        res.render("pages/box-chat/accept", {
            pageTitle: "Lời mời kết bạn ",
            users: users
        });
    }
    catch (error) {
    }
});
exports.accepts = accepts;
const friends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, socket_1.socketIo)(res);
        const userId = res.locals.user.id;
        const myUserId = yield user_model_1.default.findOne({
            _id: userId
        });
        const friendListId = myUserId.friendList.map(friend => friend.user_id);
        const users = yield user_model_1.default.find({
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
    }
    catch (error) {
    }
});
exports.friends = friends;
