const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { isAdmin } = require('../middleware/auth');

router.get('/listings', isAdmin, AdminController.getAllListings);
router.put('/approve/:id', isAdmin, AdminController.approveItem);
router.put('/reject/:id', isAdmin, AdminController.rejectItem);
router.delete('/remove/:id', isAdmin, AdminController.removeItem);

module.exports = router;
