const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

// Define routes
router.get("/", sellerController.getAllSellers);
router.get("/:id", sellerController.getSellerById);
router.post("/", sellerController.createSeller);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

module.exports = router;
