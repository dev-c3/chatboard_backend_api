const db = require("../../db/db");

class UserDao {
    // ALL FUNCTIONS NEEDED IN FILE, CREATEUSER, DELETEUSER, UPDATEUSER, GETUSER, GETALLUSERS,
    async createUser(username,password){
        const [id] = await db('users').insert({username:username,password:password}).returning('id');
        return id;
    }

    async deleteUser(id){
        await db('users').select('users.id').where('users.id', id).del();
    }

    async getUser(username){
        let db_username = await db('users').select('users.username').where('users.username', username);
        let db_userId = await db('users').select('users.id').where('users.username', username);
        let db_password = await db('users').select('users.password').where('users.username',username);
        if(db_username[0] == null){return null}
        let result = {username: db_username[0].username, password:db_password[0].password, id: db_userId};
        //console.log(result);
        return (result);
    }

    async updateUser(id){
        await db('users').select('users.id').where('users.id', id).update()
    }

}

module.exports = new UserDao();