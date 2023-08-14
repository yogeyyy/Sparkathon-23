const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  businessLogo: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  approved :{
    type: Boolean,
    default: false
  }
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
