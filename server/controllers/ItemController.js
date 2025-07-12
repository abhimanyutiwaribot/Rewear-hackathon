const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('uploader', 'name');
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching items' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploader', 'name');
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
      uploader: req.user._id,
      status: 'pending' // Default status - needs admin approval
    });

    await item.save();
    res.json({ msg: 'Item added successfully and pending approval', item });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ msg: 'Error adding item' });
  }
};

exports.swapItem = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.status !== 'approved') {
      return res.status(400).json({ msg: 'Item is not available for swapping' });
    }

    if (item.uploader.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'Cannot swap your own item' });
    }

    // Update item status
    item.status = 'swapped';
    await item.save();

    // Update user points (simplified - in real app you'd have more complex logic)
    // const uploader = await User.findById(item.uploader);
    // uploader.points += item.pointsValue;
    // await uploader.save();

    res.json({ msg: 'Item swapped successfully', item });
  } catch (error) {
    console.error('Error swapping item:', error);
    res.status(500).json({ msg: 'Error swapping item' });
  }
};

// Get items uploaded by logged-in user
exports.getUserItems = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const items = await Item.find({ uploader: req.user._id }).populate('uploader', 'name');
    res.json(items);
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).json({ msg: 'Error fetching user items' });
  }
};

// Redeem item with points
exports.redeemItem = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.status !== 'approved') {
      return res.status(400).json({ msg: 'Item is not available for redemption' });
    }

    if (item.uploader.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'Cannot redeem your own item' });
    }

    if (req.user.points < item.pointsValue) {
      return res.status(400).json({ msg: 'Not enough points to redeem this item' });
    }

    // Update item status
    item.status = 'swapped';
    await item.save();

    // Update user points (deduct points from redeemer, add to uploader)
    const User = require('../models/User');
    const redeemer = await User.findById(req.user._id);
    const uploader = await User.findById(item.uploader);

    redeemer.points -= item.pointsValue;
    uploader.points += item.pointsValue;

    await redeemer.save();
    await uploader.save();

    res.json({ 
      msg: 'Item redeemed successfully', 
      item,
      pointsDeducted: item.pointsValue,
      newBalance: redeemer.points
    });
  } catch (error) {
    console.error('Error redeeming item:', error);
    res.status(500).json({ msg: 'Error redeeming item' });
  }
};
