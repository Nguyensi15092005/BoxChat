import { Response } from "express";
import User from "../models/user.model";
import RoomsChat from "../models/rooms-chat.model";

export const socketIo = (res: Response) => {
    global._io.once('connection', async (socket) => {

        // Sự kện online
        // const myUserId = res.locals.user.id;
        // await User.updateOne({
        //     _id: myUserId
        // }, {
        //     statusOnline: "online"
        // })
        // // socketIO
        // socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", myUserId);
        // hết sự kiện online


        // sự kiện ngắn kêt nối socket offine
        // socket.on('disconnect', async () => {
        //     const myUserId = res.locals.user.id;
        //     await User.updateOne({
        //         _id: myUserId
        //     }, {
        //         statusOnline: "offline"
        //     })
        //     // socketIO
        //     socket.broadcast.emit("SERVER_RETURN_USER_STATUS_OFFLINE", myUserId);

        // })
        // hết sự kiện ngắn kêt nối socket offine


        // chức năng kết bạn 
        socket.on('CLIENT_ADD_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;

            // Thêm id A vào acceptFriend của B
            const existIdAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (!existIdAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriends: myUserId }
                })
            }

            // Thêm id B vào requestFriend của A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (!existIdBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: { requestFriends: userId }
                })
            }

            // Lấy ra độ dài acceptFriends của B trả về cho B
            const infoUser = await User.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            // Lấy ra độ dài requestFriends của A trả về cho A
            const myinfoUser = await User.findOne({
                _id: myUserId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            console.log(lengthRequestFriends)
            socket.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: myUserId,
                lengthRequestFriends: lengthRequestFriends
            });


            // Lấy info của A và trả về cho B
            const infoUserA = await User.findOne({
                _id: myUserId
            }).select("id fullName avatar");
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userId: userId,
                infoUserA: infoUserA
            })
        })


        // Hủy yêu cầu KB
        socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            // console.log(myUserId);
            // console.log(userId);

            // xóa id A khỏi acceptFriend của BB
            const existIdAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (existIdAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { acceptFriends: myUserId }
                })
            }

            //xóa id B khỏi requestFriend của A
            const existIdBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (existIdBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { requestFriends: userId }
                })
            }

            // Lấy ra độ dài acceptFriends của B trả về cho B
            const infoUser = await User.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            // Lấy ra độ dài requestFriends của A trả về cho A
            const myinfoUser = await User.findOne({
                _id: myUserId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            console.log(lengthRequestFriends)
            socket.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: myUserId,
                lengthRequestFriends: lengthRequestFriends
            });

            // lấy id của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
                userIdB: userId,
                userIdA: myUserId
            })
        });

        // Chức năng từ chối kết bạn 
        socket.on('CLIENT_REFUSE_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            // console.log(myUserId); id của B
            // console.log(userId); id của A

            // xóa id A khỏi acceptFriend của BB
            const existIdAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if (existIdAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { acceptFriends: userId }
                })
            }

            //xóa id B khỏi requestFriend của A
            const existIdBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if (existIdBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { requestFriends: myUserId }
                })
            }

            // Lấy ra độ dài acceptFriends của B trả về cho B
            const infoUser = await User.findOne({
                _id: userId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            // lấy id của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_REFUSE_FRIEND", {
                userIdB: userId,
                userIdA: myUserId
            })
        });

        // chức năng hủy kết bạn
        socket.on('CLIENT_REFUSE_FRIEND_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;

            // xóa id của B trong friendList của A
            const existAinB = await User.findOne({
                _id: myUserId,
                'friendList.user_id': userId
            });

            if (existAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { friendList: { user_id: userId } }
                })
            }

            // xóa id của A trong friendList của B
            const existBinA = await User.findOne({
                _id: userId,
                'friendList.user_id': myUserId
            });
            if (existBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { friendList: { user_id: myUserId } }
                })
            }

            // lấy ra độ dài friendList của A và B trả về cho A và B
            const infoUserA = await User.findOne({
                _id: myUserId
            });
            const infoUserB = await User.findOne({
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

        });
        // hết chức năng hủy kết bạn


        // Chức năng chấp nhận kết bạn 
        socket.on('CLIENT_ACCEPT_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            // console.log(myUserId); id của B
            // console.log(userId); id của A

            // exist friend
            const existIdAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            const existIdBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            // End exist friend


            // Tạo phòng chát chung
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
                roomChat = new RoomsChat(dataRom);
                await roomChat.save();
            }
            // het Tạo phòng chát chung


            // Thêm {user_id, room_chat_id}của A vào friendList của B
            // xóa id A khỏi acceptFriend của BB

            if (existIdAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { acceptFriends: userId }
                })
            }

            // Thêm {user_id, room_chat_id}của B vào friendList của A
            //xóa id B khỏi requestFriend của A

            if (existIdBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { requestFriends: myUserId }
                })
            }

            // Lấy ra độ dài acceptFriends của B trả về cho B
            const infoUser = await User.findOne({
                _id: myUserId
            });
            const lengthAcceptFriends = infoUser.acceptFriends.length;
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: myUserId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            // Lấy ra độ dài requestFriends của A trả về cho A
            const myinfoUser = await User.findOne({
                _id: userId
            });
            const lengthRequestFriends = myinfoUser.requestFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_REQUEST_FRIEND", {
                userId: userId,
                lengthRequestFriends: lengthRequestFriends
            });

            // Lấy ra độ dài friendList của cả A và B  trả về cho A và B
            const infoUserBB = await User.findOne({
                _id: myUserId
            });
            const infoUserA = await User.findOne({
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


            // Lấy info của B và trả về cho A
            const infoUserB = await User.findOne({
                _id: myUserId
            }).select("id fullName avatar");
            console.log(infoUserB)
            socket.broadcast.emit("SERVER_RETURN_INFO_FRIEND", {
                userId: userId,
                infoUserB: infoUserB
            })

        });
        // hết Chức năng chấp nhận kết bạn 


        // chức năng online


    })
}