const channelDao = require('./channelDAO');

class ChannelService{
    //CREATES A CHANNEL WITH THE USER AS THE ADMIN.
    async createChannel(userId,channelName){
        const channelId = await channelDao.createChannel(userId, channelName);
        return channelId;
    }
    //DELETES THE CHANNEL IF USERID ALLOWS IT.
    async deleteChannel(channelId){
        await channelDao.deleteChannel(channelId)
    }
    //Grabs all messages in a channel.
    async grabChannelMessages(channelId){
        const results = await channelDao.grabChannelMessages(channelId);
        return results;
    }
}

module.exports = new ChannelService();