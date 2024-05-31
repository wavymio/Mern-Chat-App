const express = require('express')
const { loginUser, signUp, logout } = require('../controllers/authController')
const router = express.Router()

router.get('/signup', (req, res) => {
    res.send("Yes")
})
router.post('/signup', signUp)

router.post('/login', loginUser)

router.post('/logout', logout)

module.exports = router