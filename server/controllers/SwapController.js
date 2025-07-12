const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');

// 🆕 Create swap request
exports.createSwap = async (req, res) => {
  try {
    const { itemId, type } = req.body;
    const item = await Item.findById(itemId).populate('owner');

    if (!item || item.available === false) {
      return res.status(404).json({ msg: 'Item not available' });
    }

    if (type === 'points') {
      const user = await User.findById(req.user._id);
      if (user.points < 10) {
        return res.status(400).json({ msg: 'Not enough points' });
      }
    }

    const swap = await Swap.create({
      item: item._id,
      requester: req.user._id,
      owner: item.owner._id,
      type,
    });

    res.status(201).json({ msg: 'Swap request created', swap });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Accept, Reject, Complete Swap
exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findById(req.params.id);

    if (!swap) return res.status(404).json({ msg: 'Swap not found' });
    if (swap.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Only owner can update swap status' });
    }

    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swap.item, { available: false });
    }

    if (status === 'completed' && swap.type === 'points') {
      const receiver = await User.findById(swap.requester);
      const giver = await User.findById(swap.owner);

      receiver.points -= 10; // Cost to redeem
      giver.points += 10;    // Reward for giving

      await receiver.save();
      await giver.save();
    }

    swap.status = status;
    await swap.save();

    res.json({ msg: `Swap ${status}`, swap });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Delete a pending swap (cancel)
exports.deleteSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ msg: 'Swap not found' });

    if (swap.requester.toString() !== req.user._id.toString() || swap.status !== 'pending') {
      return res.status(403).json({ msg: 'Only requester can cancel pending swaps' });
    }

    await Swap.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Swap request deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🆕 Get all swaps related to user
exports.getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.params.id }, { owner: req.params.id }]
    })
      .populate('item', 'title images')
      .populate('requester', 'name email')
      .populate('owner', 'name email');

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
    