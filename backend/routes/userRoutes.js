import express from 'express'
import { registerUser, loginUser, userData } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', protect, userData)

router.post('/register', registerUser)

router.post('/login', loginUser)

export default router