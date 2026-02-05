import express from 'express'
import { getUrl, postUrl, updateUrl, deleteUrl } from '../controllers/urlController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getUrl)

router.route('/').post(protect, postUrl)

router.patch('/:id', protect, updateUrl)

router.delete('/:id', protect, deleteUrl)

export default router