const messageDao = require('./messageDAO');

class MessageService{
    //Creates a new message in the channel.
    async createMessage(userId, channelId, message){
        const messageId = await messageDao.createMessage(userId, channelId, message);
        return messageId;
    }
    //Deletes a message created inside of a channel.
    async deleteMessage(messageId){
        await messageDao.deleteMessage(messageId);
    }

    async getMessage(messageId){
        const result = await messageDao.getMessage(messageId);
        return result;
    }
}

module.exports = new MessageService();