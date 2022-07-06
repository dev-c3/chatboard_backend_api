const userDao = require('./userDAO');
class UserService {
    //CREATES A USER
    async createUser(userObj){
        const {username, password} = userObj
        //SENDS PARAMETERS TO THE USER DATA ACCESS OBJECT AND GRABS USERID OR OTHER RETURNED VALUES FROM
        //USER DATA ACCESS OBJECT AFTER INSERTING NEW USER INTO TABLE
        const newUser = await userDao.createUser(username, password)
        console.log(newUser);
        return newUser;
    }
    //REMOVES A USER FROM THE DATABASE
    async removeUser(userObj){
        const {id} = userObj;
        await userDao.deleteUser(id);
        console.log('deleted')
    }
    
    async findUser(username){
        let user = await userDao.getUser(username);
        if(user != null){
            //console.log(user);
            return user; 
        }
        return null;
    }
}

module.exports = new UserService()