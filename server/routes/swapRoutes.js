const express = require('express');
const router = express.Router();
const SwapController = require('../controllers/SwapController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/', isAuthenticated, SwapController.createSwap);               // Request swap
router.put('/:id/status', isAuthenticated, SwapController.updateSwapStatus); // Accept/Reject/Complete
router.delete('/:id', isAuthenticated, SwapController.deleteSwap);          // Cancel request
router.get('/user/:id', isAuthenticated, SwapController.getUserSwaps);      // View swaps of a user

module.exports = router;
