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
exports.roomChat = exports.chat = void 0;
const chat_1 = require("../socket/chat");
const chat_model_1 = __importDefault(require("../models/chat.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const rooms_chat_model_1 = __importDefault(require("../models/rooms-chat.model"));
const chat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomChatId = req.params.roomChatId;
        const userid = res.locals.user.id;
        (0, chat_1.chatSocket)(req, res);
        const chats = yield chat_model_1.default.find({
            rom_chat_id: roomChatId,
            deleted: false
        });
        for (const chat of chats) {
            const inforUser = yield user_model_1.default.findOne({
                _id: chat.user_id
            }).select("fullName");
            chat["inforUser"] = inforUser;
        }
        const user = yield user_model_1.default.findOne({
            'friendList.room_chat_id': req.params.roomChatId,
            _id: { $ne: userid }
        });
        res.render("pages/chat/index", {
            pageTitle: "Nhắn tin",
            chats: chats,
            userFriend: user
        });
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Lỗi");
        res.redirect("/box-chat/fiends");
    }
});
exports.chat = chat;
const roomChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomChatId = req.params.roomChatId;
        const userid = res.locals.user.id;
        (0, chat_1.chatSocket)(req, res);
        const chats = yield chat_model_1.default.find({
            rom_chat_id: roomChatId,
            deleted: false
        });
        for (const chat of chats) {
            const inforUser = yield user_model_1.default.findOne({
                _id: chat.user_id
            }).select("fullName");
            chat["inforUser"] = inforUser;
        }
        const room = yield rooms_chat_model_1.default.findOne({
            _id: roomChatId
        }).select("title");
        res.render("pages/chat/room-chat", {
            pageTitle: "nhắn tin theo phòngg",
            chats: chats,
            room: room
        });
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Lỗi");
        res.redirect("/box-chat/fiends");
    }
});
exports.roomChat = roomChat;
