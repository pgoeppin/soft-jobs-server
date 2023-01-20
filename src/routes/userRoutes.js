const express = require('express')
const router = express.Router()
const { userRegister, showUsers } = require("../controllers/usersController")
const { isLogin } = require("../middlewares/isLogin")

router.post("/usuarios", userRegister)
router.get("/usuarios", isLogin, showUsers)

module.exports = router