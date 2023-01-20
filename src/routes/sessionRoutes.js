const express = require('express')
const router = express.Router()
const { loginUser } = require('../controllers/sessionController')
const { reportRequest } = require('../middlewares/logger')

router.post('/login', reportRequest, loginUser)

module.exports = router