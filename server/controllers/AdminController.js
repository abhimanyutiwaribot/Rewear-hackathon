const Item = require('../models/Item');
const User = require('../models/User');
const Swap = require('../models/Swap');

exports.getAllListings = async (req, res) => {
  try {
    const status = req.query.status;
    const items = status
      ? await Item.find({ status }).populate('owner', 'name email')
      : await Item.find().populate('owner', 'name email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item approved', item });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item rejected', item });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email location role banned points');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Toggle ban/unban user
exports.toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.banned = !user.banned;
    await user.save();

    res.json({
      msg: user.banned ? 'User has been banned' : 'User has been unbanned',
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Get all swaps
exports.getAllSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate('item', 'title')
      .populate('requester', 'name email')
      .populate('owner', 'name email');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Get statistics
exports.getStats = async (req, res) => {
  try {
    const [pendingItems, activeUsers, activeSwaps] = await Promise.all([
      Item.countDocuments({ status: 'pending' }),
      User.countDocuments({ banned: false }),
      Swap.countDocuments({ status: 'pending' })
    ]);

    res.json({
      pendingItems,
      activeUsers,
      activeSwaps
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};