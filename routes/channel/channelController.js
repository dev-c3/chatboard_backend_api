const channelService = require('./channelService');
const createChannel = async (req, res,next) => {
    if((req.session.loggedIn == undefined || req.session.loggedIn == false) && req.session.username == undefined){
        return res.status(400).send({message:'You need to sign in to create a channel.'}); 
    }
    if(req.body.channelName){
       const channelId = await channelService.createChannel(req.session.userId, req.body.channelName);
       return res.status(201).send({message:'a new Channel has been created!'});
    }
    return res.status(400).send({message: 'Must have a valid channel name.'})

}

const getChannelMessages = async (req,res,next)=>{
    const messages = await channelService.getChannelMessages(req.body.channelId);
    console.log(messages);w3
    res.send(messages.map(message=>{
        `${message}`
    }).join(''));
}
module.exports = {createChannel, getChannelMessages};