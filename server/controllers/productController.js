const Product = require("../models/Product");
const Seller = require("../models/Seller");


exports.getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(Product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.createProduct = async (req, res) => {
  try {

    const Product = await Product.create(req.body);
    res.status(201).json(Product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};





exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const Product = await Product.findById(productId);
    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const seller = Seller.findById(Product.seller);

    const sellerProducts = seller.products.filter( product => product !== productId);

    seller.products = sellerProducts;

    await seller.save();

    await Product.remove();
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.findProductsBySeller = async (req, res) => {
  try {
    const Product = await Product.find({ seller: req.params.id });
    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(Product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}