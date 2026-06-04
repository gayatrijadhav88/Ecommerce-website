import mongoose from 'mongoose';

const browsingHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    viewedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const BrowsingHistory = mongoose.model('BrowsingHistory', browsingHistorySchema);
export default BrowsingHistory;

