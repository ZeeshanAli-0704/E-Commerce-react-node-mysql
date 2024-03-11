// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for user registration
router.post("/register", userController.register);

// Route for user login
router.post("/login", userController.login);

module.exports = router;
