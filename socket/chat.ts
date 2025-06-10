import { Request, Response } from "express"
import Chat from "../models/chat.model";
import { uploadToCloudinary } from "../helper/uploadToCloudinary";


export const chatSocket = async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const avatar = res.locals.user.avatar;
    const roomChatId = req.params.roomChatId;
    global._io.once('connection', async (socket) => {

        socket.join(roomChatId);

        socket.on("CLIENT_SEND_MESSAGE", async (data) => {

            let images = [];
            for (const key in data.images) {
                const link = await uploadToCloudinary(data.images[key]);
                images.push(link);
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images,
                rom_chat_id: roomChatId
            });

            await chat.save()

            global._io.to(roomChatId).emit('CLIENT_RETURN _MESSAGE', {
                user_id: userId,
                fullName: fullName,
                avatar: avatar,
                content: data.content,
                images: images
            });
        })
        socket.on('CLIENT_SEND_TYPING', async (type) => {
            socket.broadcast.to(roomChatId).emit("CLIENT_RETURN_TYPING", {
                user_id: userId,
                fullName: fullName,
                type: type
            })

            // socket.broadcast.to(roomChatId).emit("CLIENT_RETURN_TYPING", {
            //     user_id: userId,
            //     fullName: fullName,
            //     type: type
            // })

        });
    })
}