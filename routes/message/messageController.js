const messageService = require("./messageService");


const sendMessage = async (req,res,next)=>{
    if((req.session.loggedIn == undefined || req.session.loggedIn == false) && req.session.username == undefined){
        return res.status(400).send({message:'You need to sign in to send a message.'}); 
    }

    const result = await messageService.createMessage(res.session.userId, req.body.channelId, req.body.message);
    return res.status(400).send({message:'Message successfully sent!'})

}

//HELPER FUNCTIONS

const isLoggedIn = (req) => {

}


module.exports = {sendMessage};