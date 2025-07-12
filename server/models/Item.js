const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true }, // Added type field
  size: { type: String, required: true },
  condition: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }],
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'swapped'], 
    default: 'pending' 
  },
  pointsValue: { type: Number, default: 10, min: 1 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
