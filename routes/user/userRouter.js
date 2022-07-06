const express = require('express');
const errorHandler = require('../errorHandler')
const router = express.Router();

const {getUser, createUser, removeUser, userLogin, userLogout} = require("./userController")
//default routes with corresponding handlers in 
router.get("/", getUser)
router.delete("/", removeUser)

router.get("/login", userLogin);
router.post("/signup", createUser);
router.get('/logout', userLogout)
router.get("/:id", function (req, res){
    res.send('id');
})
router.all("/", errorHandler)

/*
router.post("/",)
router.delete("/",)
router.put("/", )
*/
module.exports = router