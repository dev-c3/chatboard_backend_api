const userService = require('./userService');
const bcrypt = require('bcrypt')


const getUser = (req, res, next) => {

}
// CONTROLLER TO CREATE NEW USER INCLUDING HANDLER FUNCTION IF NECCESARRY, THROWS ERROR IF BODY ITEMS ARE NOT VALID OR IF USER ALREADY EXISTS.
const createUser = async (req, res, next)=>{
    const {username, password} = req.body;
    
    try{
        //CHECKS IF KEYS ARE INSIDE OF THE OBJECT, AND IF THE VALUES ARE NOT NULL OR EMPTY, ALSO CHECKS IF THE USER EXISTS INSIDE OF THE DATABASE.
        if(checkLoginInputs({username, password}, ['username', 'password']) == false){
            return res.status(400).send({message: 'Invalid Inputs'})
        }
        if(await userExists(username)){
            res.status(400).send({message: 'Username already exists!'})
        }
        //HASHES PASSWORD WITH 10 SALT ROUNDS BEFORE ENTERING HASHED PASSWORD INTO THE DATABASE.
        let hash = await bcrypt.hash(password,10)
        
        await userService.createUser({username, password:hash})
        return res.sendStatus(201);   
    } catch (err){
        return res.status(400).send({message: 'Something went wrong!'})
    }
}
//CONTROLLER TO REMOVE A USER BASED ON THEIR ID WHEN A REQUEST IS SENT BY ANYONE. LOGS NOTHING RETURNS NOTHING.
const removeUser = async (req, res,next) =>{
try{
    await userService.removeUser(req.body);
    res.sendStatus(201);
} catch (err){
    console.log(err)
}
}
//LOGS THE USER IN.
const userLogin = async (req,res,next)=>{
    const {username, password} = req.body;
    try{
        //CHECKS IF KEYS ARE INSIDE OF THE OBJECT, AND IF THE VALUES ARE NOT NULL OR EMPTY, ALSO CHECKS IF THE USER EXISTS INSIDE OF THE DATABASE.
        if(checkLoginInputs({username, password}, ['username', 'password']) == false){
            return res.status(400).send({message: 'Invalid Inputs'})
        }

        if(await checkAuthentication({username, password}) == false){
            return res.status(400).send({message: 'Login failed.'})
        }
        const user = await userExists(username);
        //HASHES PASSWORD WITH 10 SALT ROUNDS BEFORE ENTERING HASHED PASSWORD INTO THE DATABASE.
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.userId = user.id[0].id;
        console.log(req.session);
        return res.sendStatus(200);   
    } catch (err){
        return res.status(400).send({message: 'Something went wrong!'})
    }
}

//LOGS USER OUT, REMOVING THE USERNAME AND LOG FROM SESSION STORAGE
const userLogout = async (req,res,next)=>{
    console.log(req.session.loggedIn, req.session.username, req.session);
    if((req.session.loggedIn == undefined || req.session.loggedIn == false) && req.session.username == undefined){
       return res.status(200).send({message:'You are already logged out!'}); 
    }
    req.session.loggedIn = false;
    req.session.username = null;
    req.session.userId = null;
    return res.status(200).send({message:'You have been successfully logged out.'}); 
}
// HELPER FUNCTIONS!!
const checkAuthentication = async ({username, password}) => {
    const userFound = await userExists(username);
    //console.log(userFound, username, password, await await bcrypt.compare(password, userFound.password))
    if (userFound){
        if(await bcrypt.compare(password, userFound.password)){
            return true;
        }
        return false;
    }
    return false;
}

//CHECKS IF INPUTS ARE INSIDE OF AN OBJECT AND IF INPUTS HOLD A VALUE THAT IS NOT UNDEFINED OR EMPTY.
const checkLoginInputs = (inputsObject, neededInputs) => {
    let isInputValid = true;
    neededInputs.forEach((input)=>{
        if((inputsObject[input] == undefined || inputsObject[input] == "")){
            isInputValid = false;
        }})
    return isInputValid;
}

//CHECKS IF USERNAME EXISTS INSIDE OF DATABASE. RETURNS THE USER OBJECT CONTAINING USERNAME AND HASHED PASSWORD, OTHERWISE RETURNS FALSE.
const userExists = async (username) => {
    const user = await userService.findUser(username)
    if(user == null){
        return false;
    }
    return user;
}

module.exports =  {getUser, createUser, removeUser, userLogin, userLogout}