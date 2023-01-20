const express = require('express')
const router = express.Router()
const { userRegister } = require("../controllers/usersController")

router.post("/user", userRegister)

module.exports = router