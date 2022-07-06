const db = require("../../db/db");
class MessageDAO{
    //CREATES A MESSAGE.
    async createMessage(userId, channelId,message){
        const id = await db('messages').insert({user_id:userId, channel_id:channelId, message}).returning('id');

        return id;
    };
    //DELETES A MESSAGE.
    async deleteMessage(messageId){
        await db('messages').select('messages.id').where('message.id', messageId).del();
    }
    
    async getMessage(messageId){
        const message = await db('messages').where('message.id',messageId).select();
        if(message[0] == null){
            return null;
        }
        return message;
    }
}

module.exports = new MessageDAO()