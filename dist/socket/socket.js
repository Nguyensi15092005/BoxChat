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
exports.socketIo = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const rooms_chat_model_1 = __importDefault(require("../models/rooms-chat.model"));
const socketIo = (res) => {
    global._io.once('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        socket.on('CLIENT_ADD_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const myUserId = res.locals.user.id;
            const existIdAinB = yield user_model_1.default.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (!existIdAinB) {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriends: myUserId }
                });
            }
            const existIdBinA = yield user_model_1.default.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (!existIdBinA) {
                yield user_model_1.default.updateOne({
                    _id: myUserId
                }, {
                    $push: { requestFriends: userId }
                });
            }
            const infoUser = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });
            const myinfoUser = yield user_model_1.default.findOne({
                _id: myUserId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            console.log(lengthRequestFriends);
            socket.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: myUserId,
                lengthRequestFriends: lengthRequestFriends
            });
            const infoUserA = yield user_model_1.default.findOne({
                _id: myUserId
            }).select("id fullName avatar");
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userId: userId,
                infoUserA: infoUserA
            });
        }));
        socket.on('CLIENT_CANCEL_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const myUserId = res.locals.user.id;
            const existIdAinB = yield user_model_1.default.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (existIdAinB) {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $pull: { acceptFriends: myUserId }
                });
            }
            const existIdBinA = yield user_model_1.default.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (existIdBinA) {
                yield user_model_1.default.updateOne({
                    _id: myUserId
                }, {
                    $pull: { requestFriends: userId }
                });
            }
            const infoUser = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });
            const myinfoUser = yield user_model_1.default.findOne({
                _id: myUserId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            console.log(lengthRequestFriends);
            socket.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: myUserId,
                lengthRequestFriends: lengthRequestFriends
            });
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
                userIdB: userId,
                userIdA: myUserId
            });
        }));
        socket.on('CLIENT_REFUSE_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const myUserId = res.locals.user.id;
            const existIdAinB = yield user_model_1.default.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if (existIdAinB) {
                yield user_model_1.default.updateOne({
                    _id: myUserId
                }, {
                    $pull: { acceptFriends: userId }
                });
            }
            const existIdBinA = yield user_model_1.default.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if (existIdBinA) {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $pull: { requestFriends: myUserId }
                });
            }
            const infoUser = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });
            socket.broadcast.emit("SERVER_RETURN_REFUSE_FRIEND", {
                userIdB: userId,
                userIdA: myUserId
            });
        }));
        socket.on('CLIENT_REFUSE_FRIEND_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const myUserId = res.locals.user.id;
            const existAinB = yield user_model_1.default.findOne({
                _id: myUserId,
                'friendList.user_id': userId
            });
            if (existAinB) {
                yield user_model_1.default.updateOne({
                    _id: myUserId
                }, {
                    $pull: { friendList: { user_id: userId } }
                });
            }
            const existBinA = yield user_model_1.default.findOne({
                _id: userId,
                'friendList.user_id': myUserId
            });
            if (existBinA) {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $pull: { friendList: { user_id: myUserId } }
                });
            }
            const infoUserA = yield user_model_1.default.findOne({
                _id: myUserId
            });
            const infoUserB = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthFriendsA = infoUserA.friendList.length;
            const lengthFriendsB = infoUserB.friendList.length;
            global._io.emit("SERVER_RETURN_LENGTH_FRIEND_FRIEND", {
                userIdB: userId,
                userIdA: myUserId,
                lengthFriendsA: lengthFriendsA,
                lengthFriendsB: lengthFriendsB
            });
        }));
        socket.on('CLIENT_ACCEPT_FRIEND', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const myUserId = res.locals.user.id;
            const existIdAinB = yield user_model_1.default.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            const existIdBinA = yield user_model_1.default.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            let roomChat;
            if (existIdAinB && existIdBinA) {
                const dataRom = {
                    typeRome: "friend",
                    users: [
                        {
                            user_id: userId,
                            role: "superAdmin",
                        },
                        {
                            user_id: myUserId,
                            role: "superAdmin",
                        }
                    ],
                };
                roomChat = new rooms_chat_model_1.default(dataRom);
                yield roomChat.save();
            }
            if (existIdAinB) {
                yield user_model_1.default.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { acceptFriends: userId }
                });
            }
            if (existIdBinA) {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { requestFriends: myUserId }
                });
            }
            const infoUser = yield user_model_1.default.findOne({
                _id: myUserId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: myUserId,
                lengthAcceptFriends: lengthAcceptFriends
            });
            const myinfoUser = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: userId,
                lengthRequestFriends: lengthRequestFriends
            });
            const infoUserBB = yield user_model_1.default.findOne({
                _id: myUserId
            });
            const infoUserA = yield user_model_1.default.findOne({
                _id: userId
            });
            const lengthFriendsA = infoUserA.friendList.length;
            const lengthFriendsB = infoUserBB.friendList.length;
            global._io.emit("SERVER_RETURN_LENGTH_FRIEND_FRIEND", {
                userIdA: userId,
                userIdB: myUserId,
                lengthFriendsA: lengthFriendsA,
                lengthFriendsB: lengthFriendsB
            });
            const infoUserB = yield user_model_1.default.findOne({
                _id: myUserId
            }).select("id fullName avatar");
            console.log(infoUserB);
            socket.broadcast.emit("SERVER_RETURN_INFO_FRIEND", {
                userId: userId,
                infoUserB: infoUserB
            });
        }));
    }));
};
exports.socketIo = socketIo;
