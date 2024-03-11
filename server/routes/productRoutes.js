// productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get product details by ID
router.get("/:id", productController.getProductDetailsById);

// Route to get all orders product details by ID
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Route to create a new product
router.post("/create", productController.createProduct);

// Route to update an existing product
router.post("/update", productController.updateProduct);

// Route to delete a product by ID
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
