const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: 'Other'
  },
  imageUrl: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the seller
    required: true
  },
  ratings: [{
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  reviews: [{
    review: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
  // Other fields as needed
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;