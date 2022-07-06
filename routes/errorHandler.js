const errorHandler = (req,res,next) =>{
    res.status(400).send({message: 'route does not exist.'});
}

module.exports = errorHandler;