// cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route to get shopping cart for a user
router.get("/:userId", cartController.getShoppingCart);

// Route to add a product to the shopping cart
router.post("/add", cartController.addToCart);

// Route to remove a product from the shopping cart
router.delete("/remove/:productId/:userId", cartController.removeFromCart);

router.post("/buy/:id", cartController.buy);

module.exports = router;
