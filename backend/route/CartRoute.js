const express = require('express');
const router = express.Router();
const cont = require('../controller/CartController')


router.post('/addCart',cont.addCart);
router.get('/getCart',cont.getCart); 

module.exports = router;