const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/listings', AdminController.getAllListings);
router.put('/approve/:id', AdminController.approveItem);
router.delete('/remove/:id', AdminController.removeItem);

module.exports = router;
