const express = require('express');
const router = express.Router();
const {getUrl,postUrl,updateUrl,deleteUrl} =require('../controllers/urlController');
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getUrl).post(protect,postUrl);

router.patch('/:id',protect,updateUrl)

router.delete('/:id',protect,deleteUrl)

module.exports = router ;