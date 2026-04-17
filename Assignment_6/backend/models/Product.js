import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '1 Colour',
  },
  price: {
    type: Number,
    required: true,
  },
  availableSizes: {
    type: [String],
    default: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
  },
  detailImages: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 4.7,
  },
  reviewCount: {
    type: Number,
    default: 1071,
  },
  originCountry: {
    type: String,
    default: 'Indonesia',
  },
  styleCode: {
    type: String,
    default: 'N/A',
  },
  colours: [{
    name: String,
    code: String,
  }],
  category: {
    type: String,
    enum: ['Men', 'Women', 'Kids'],
    required: true,
  },
  imageUrl: {
    type: String,
    default: '/images/placeholder.png',
  },
  description: String,
  isNew: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
