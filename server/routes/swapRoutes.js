import express from 'express';
import { createSwap, updateSwapStatus, deleteSwap, getUserSwaps } from '../controllers/SwapController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createSwap);               // Request swap
router.put('/:id/status', isAuthenticated, updateSwapStatus); // Accept/Reject/Complete
router.delete('/:id', isAuthenticated, deleteSwap);          // Cancel request
router.get('/user/:id', isAuthenticated, getUserSwaps);      // View swaps of a user

export default router;
