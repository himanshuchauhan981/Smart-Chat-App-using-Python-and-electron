const { userChat } = require('../models')

const setReadMessagesStatus = async (room,sender,reciever) =>{
    await userChat.updateMany(
        {
            $and:[
                {room: room},
                {reciever: reciever},
                {sender: reciever.toLowerCase()},
                {isRead: false}
            ]
        },
        {
            $set:{
                isRead: true
            }
        }
    )
}


let chatHandler = {
    getParticularRoomMessages : async (roomID,sender,reciever) =>{
        let messageData = await userChat.find({room: roomID},{text:1, sendDate:1, sender: 1})
        await setReadMessagesStatus(roomID, sender, reciever)
        return messageData
    }
}

module.exports = chatHandler