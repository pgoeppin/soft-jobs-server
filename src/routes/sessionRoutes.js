const express = require('express')
const router = express.Router()
const { loginUser } = require('../controllers/sessionController')

router.get('/login', loginUser)

module.exports = router