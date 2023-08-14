

const Admin = require('../models/Admin');
const Seller = require('../models/Seller');


exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Approve the seller 
exports.approveSeller = async (req, res) => {
  try {
    const { sellerId } = req.body;

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    await Seller.findByIdAndUpdate(sellerId, { approved: true })

    res.json({ message: 'Seller approved successfully' });

  } catch (error) {
    console.log(error);
    res.status().json({ error: 'Internal server error' })
  }
}

//update the product
// if the logged in user role is admin
exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updatedData = req.body; 

  try {
    // Find the product to be updated
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields with the new data
    Object.assign(product, updatedData);

    // Save the updated product
    await product.save();

    return res.status(200).json({ message: 'Product updated successfully', updatedProduct: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}