const User = require("../models/User");

const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Order = require("../models/Order");


const jwt = require("jsonwebtoken");

// Controller functions for user-related operations
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

exports.createUser = async (req, res) => {
  try {

    const existingUser = await User.findOne({ useremail });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {



    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};

exports.deleteUserAndSeller = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user's role is "seller"
    if (user.role === 'seller') {
      // Find the corresponding seller
      const seller = await Seller.findOne({ userId });

      if (seller) {

        // Delete the seller's products and orders
        await Promise.all([
          Product.deleteMany({ _id: { $in: seller.products } }),
          Order.deleteMany({ _id: { $in: seller.orders } }),
        ]);
        // Delete the seller
        await seller.remove();
      }
    }

    // Delete the user
    await user.remove();

    return res.json({ message: 'User and corresponding seller (if applicable) deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting user and seller' });
  }
};


// Login user
exports.Login = async (req, res) => {
  const { useremail, userpassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ useremail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords

    if (user.userpassword !== userpassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

    res.cookie('token', token, { httpOnly: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


