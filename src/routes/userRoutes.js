const express = require('express')
const router = express.Router()
const { userRegister, showUsers } = require("../controllers/usersController")
const { isLogin } = require("../middlewares/isLogin")
const { reportRequest } = require('../middlewares/logger')

router.post("/usuarios", reportRequest, userRegister)
router.get("/usuarios", reportRequest, isLogin, showUsers)

module.exports = router