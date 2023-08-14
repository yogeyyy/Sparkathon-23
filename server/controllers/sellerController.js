const Seller = require("../models/Seller");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { arrayBuffer } = require("stream/consumers");

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new seller
exports.createSeller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update seller by ID
// if the logged in user role in seller
exports.updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete seller by ID
// if the logged in user role in seller
exports.deleteSeller = async (req, res) => {
  const sellerId = req.params.sellerId;

  try {
    // Find the seller to be deleted
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Find the corresponding user
    const user = await User.findById(seller.userId);
    

    // Delete the seller's products
    await Product.deleteMany({ _id: { $in: seller.products } });

    // Delete the seller's orders
    await Order.deleteMany({ _id: { $in: seller.orders } });

    // Delete the seller
    await Seller.findByIdAndDelete(sellerId);

    // Update the user's role to 'buyer'
    if(user){
      
      user.role = 'buyer';
      await user.save();
    }

    return res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Update product
// if the logged in user role in seller
exports.updateProduct = async (req, res) => {
  try {
    
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if(!product){
      return res.status(404).json({ message: 'Product not found' });
    }

    const seller = await Seller.findById(product.seller);

    if(!seller){
      await product.remove();
      return res.status(404).json({ message: 'Seller not found' });
    }

    if(!seller.products.includes(productId)){
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedData = req.body;

    Object.assign(product, updatedData);

    await product.save();


    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
