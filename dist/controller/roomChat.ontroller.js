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
exports.createPost = exports.create = exports.index = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const rooms_chat_model_1 = __importDefault(require("../models/rooms-chat.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.id;
        const roomsChat = yield rooms_chat_model_1.default.find({
            typeRome: "group",
            'users.user_id': userId,
            deleted: false
        });
        res.render("pages/room-chat/index", {
            pageTitle: "Phòng chát",
            roomsChat: roomsChat
        });
    }
    catch (error) {
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendList = res.locals.user.friendList;
        for (const friend of friendList) {
            const infoFriend = yield user_model_1.default.findOne({
                _id: friend.user_id,
                deleted: false
            }).select("fullName avatar");
            friend["infoFriend"] = infoFriend;
        }
        res.render("pages/room-chat/create", {
            pageTitle: "Tạo phòng",
            friendList: friendList
        });
    }
    catch (error) {
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const usersId = req.body.userId;
        const dataRoomchat = {
            title: title,
            typeRome: "group",
            users: []
        };
        for (const userId of usersId) {
            dataRoomchat.users.push({
                user_id: userId,
                role: "user"
            });
        }
        dataRoomchat.users.push({
            user_id: res.locals.user.id,
            role: "superAdmin"
        });
        const roomchat = new rooms_chat_model_1.default(dataRoomchat);
        yield roomchat.save();
        res.redirect(`/chat/room-chat/${roomchat.id}`);
    }
    catch (error) {
    }
});
exports.createPost = createPost;
