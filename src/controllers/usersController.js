const { createUser } = require("../models/usersModel")

const userRegister = async (req, res) => {   
    try {
        const user = req.body
        const newUser = await createUser(user)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
}

module.exports = { userRegister }