const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const upload = require('../middleware/upload');

router.get('/', ItemController.getAllItems);
router.get('/user', ItemController.getUserItems);
router.get('/:id', ItemController.getItemById);
router.post('/', upload.array('images', 5), ItemController.addItem);
router.put('/:id/swap', ItemController.swapItem);
router.put('/:id/redeem', ItemController.redeemItem);

module.exports = router;
