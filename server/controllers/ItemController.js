const Item = require('../models/Item');
const User = require('../models/User');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('owner', 'name');
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching items' });
  }
};

// Get only approved items for landing page
exports.getApprovedItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'approved' }).populate('owner', 'name');
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching approved items' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name');
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching item' });
  }
};

exports.addItem = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { title, description, category, type, size, condition, tags } = req.body;
    
    // Handle tags - convert string to array if needed
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const item = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tagsArray,
      images,
      owner: req.user._id,
      status: 'pending' // Default status - needs admin approval
    });

    await item.save();
    res.json({ msg: 'Item added successfully and pending approval', item });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ msg: 'Error adding item' });
  }
};

// Get items uploaded by logged-in user
exports.getUserItems = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const items = await Item.find({ owner: req.user._id }).populate('owner', 'name');
    res.json(items);
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).json({ msg: 'Error fetching user items' });
  }
};

// Swap item with another item
exports.swapItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.status !== 'approved') {
      return res.status(400).json({ msg: 'Item is not available for swapping' });
    }

    if (item.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'Cannot swap your own item' });
    }

    // Update item status
    item.status = 'swapped';
    await item.save();

    res.json({ msg: 'Item swapped successfully', item });
  } catch (error) {
    console.error('Error swapping item:', error);
    res.status(500).json({ msg: 'Error swapping item' });
  }
};

// Redeem item with points
exports.redeemItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.status !== 'approved') {
      return res.status(400).json({ msg: 'Item is not available for redemption' });
    }

    const user = await User.findById(req.user._id);
    if (user.points < item.pointsValue) {
      return res.status(400).json({ msg: 'Not enough points to redeem this item' });
    }

    // Update item status and user points
    item.status = 'swapped';
    user.points -= item.pointsValue;

    await Promise.all([item.save(), user.save()]);

    res.json({
      msg: 'Item redeemed successfully',
      item,
      pointsDeducted: item.pointsValue,
      remainingPoints: user.points
    });
  } catch (error) {
    console.error('Error redeeming item:', error);
    res.status(500).json({ msg: 'Error redeeming item' });
  }
};
