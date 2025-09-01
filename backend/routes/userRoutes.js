const express = require('express')
const router = express.Router()
const { registerUser,
    loginUser,
    userData,
} = require('../controllers/userController')
const {protect}  = require('../middleware/authMiddleware')

router.get('/me',protect,userData)

router.post('/',registerUser)

router.post('/login',loginUser)


module.exports = router;