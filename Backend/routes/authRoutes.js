const express = require('express')
const { loginUser, signUp, logout } = require('../controllers/authController')
const router = express.Router()

router.get('signup', signUp)

router.get('/login', loginUser)

router.get('/logout', logout)

module.exports = router