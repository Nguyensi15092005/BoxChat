"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomChat = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    status: String,
    typeRome: String,
    users: [
        {
            user_id: String,
            role: String,
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
});
const RoomsChat = mongoose_1.default.model('RoomsChat', RoomChat, "rooms-chat");
exports.default = RoomsChat;
