const db = require("../../db/db");
class ChannelDAO{
    //CREATES A CHANNEL WITH THE USER AS THE ADMIN OF THE CHANNEL
    async createChannel(userId, channelName){
        const id = await db('channels').insert({admin_id:userId, channel_name:channelName}).returning('id');
        return id;
    }
    //DELETES THE CHANNEL
    async deleteChannel(channelId){
        await db('channels').select("channels.id").where("channels.id", channelId).del();
    }
    //GRABS ALL MESSAGES FROM SELECTED CHANNEL BY TIMESTAMP
    async grabChannelMessages(channelId){
        const results = await db('messages').where('messages.channel_id', channelId).select();
        return results;
    }
}

module.exports = new ChannelDAO()