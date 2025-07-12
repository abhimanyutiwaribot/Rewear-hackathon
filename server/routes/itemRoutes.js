const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const upload = require('../middleware/upload');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ItemController.getAllItems);
router.get('/approved', ItemController.getApprovedItems);
router.get('/user', ensureAuthenticated, ItemController.getUserItems);
router.get('/:id', ItemController.getItemById);
router.post('/add', ensureAuthenticated, upload.array('images', 5), ItemController.addItem);
router.put('/:id/swap', ensureAuthenticated, ItemController.swapItem);
router.put('/:id/redeem', ensureAuthenticated, ItemController.redeemItem);

module.exports = router;
