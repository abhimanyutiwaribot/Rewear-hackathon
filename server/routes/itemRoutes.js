import express from 'express';
import { getAllItems, getApprovedItems, getUserItems, getItemById, addItem, swapItem, redeemItem } from '../controllers/ItemController.js';
import upload from '../middleware/upload.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/approved', getApprovedItems);
router.get('/user', ensureAuthenticated, getUserItems);
router.get('/:id', getItemById);
router.post('/add', ensureAuthenticated, upload.array('images', 5), addItem);
router.put('/:id/swap', ensureAuthenticated, swapItem);
router.put('/:id/redeem', ensureAuthenticated, redeemItem);

export default router;
