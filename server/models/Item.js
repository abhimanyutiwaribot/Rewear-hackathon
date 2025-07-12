import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  tags: [String],
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'swapped'], default: 'pending' },
  pointsValue: { type: Number, default: 100 }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);

