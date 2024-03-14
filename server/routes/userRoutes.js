// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

// Route for user registration
router.post("/register", userController.register);

// Route for user login
router.post("/login", userController.login);


module.exports = router;
