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
exports.chatSocket = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const uploadToCloudinary_1 = require("../helper/uploadToCloudinary");
const chatSocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const avatar = res.locals.user.avatar;
    const roomChatId = req.params.roomChatId;
    global._io.once('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", (data) => __awaiter(void 0, void 0, void 0, function* () {
            let images = [];
            for (const key in data.images) {
                const link = yield (0, uploadToCloudinary_1.uploadToCloudinary)(data.images[key]);
                images.push(link);
            }
            const chat = new chat_model_1.default({
                user_id: userId,
                content: data.content,
                images: images,
                rom_chat_id: roomChatId
            });
            yield chat.save();
            global._io.to(roomChatId).emit('CLIENT_RETURN _MESSAGE', {
                user_id: userId,
                fullName: fullName,
                avatar: avatar,
                content: data.content,
                images: images
            });
        }));
        socket.on('CLIENT_SEND_TYPING', (type) => __awaiter(void 0, void 0, void 0, function* () {
            socket.broadcast.to(roomChatId).emit("CLIENT_RETURN_TYPING", {
                user_id: userId,
                fullName: fullName,
                type: type
            });
        }));
    }));
});
exports.chatSocket = chatSocket;
