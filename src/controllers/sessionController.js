const { getUser } = require("../models/usersModel");
const bcrypt = require("bcryptjs")

const loginUser = async (req, res) => {
    const userSearched = req.body
    // userSearched.email.toLowerCase()
    // userSearched.password.toLowerCase()
    try {
        const user = await getUser(userSearched)
        console.log("login", user) 
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
}

module.exports = { loginUser }