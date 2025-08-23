const express = require('express');
const router = express.Router();
const {getUrl,postUrl,patchUrl,deleteUrl} =require('../controllers/urlController');

router.route('/').get(getUrl).post(postUrl);

router.patch('/:id',patchUrl)

router.delete('/:id',deleteUrl)

module.exports = router ;