const Buyer = require("../models/Buyer");

// Get all buyers
exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get buyer by ID
exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ error: "Buyer not found" });
    }
    res.json(buyer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new buyer
exports.createBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(201).json(buyer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update buyer by ID
exports.updateBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!buyer) {
      return res.status(404).json({ error: "Buyer not found" });
    }
    res.json(buyer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete buyer by ID
exports.deleteBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!buyer) {
      return res.status(404).json({ error: "Buyer not found" });
    }
    res.json({ message: "Buyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
