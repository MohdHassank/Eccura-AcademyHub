const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// 🎯 Route: POST /api/auth/signup
// Jab koi is URL par POST request bhejega, toh authController ka signup function chalega.
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/profile/:id", authController.updateProfile);

module.exports = router;