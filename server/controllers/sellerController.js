const Seller = require("../models/Seller");

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
exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
