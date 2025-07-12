const Item = require('../models/Item');

exports.getAllListings = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden: Admins only' });
  }
  const items = await Item.find().populate('owner', 'name email');
  res.json(items);
};

exports.approveItem = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden: Admins only' });
  }
  const item = await Item.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  res.json({ msg: 'Item approved', item });
};

exports.rejectItem = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden: Admins only' });
  }
  const item = await Item.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json({ msg: 'Item rejected', item });
};

exports.removeItem = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden: Admins only' });
  }
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Item removed' });
};
