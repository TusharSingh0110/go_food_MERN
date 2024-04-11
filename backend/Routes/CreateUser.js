const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Route for creating a new user
router.post("/creatuser", [
    // Validate email format
    body('email').isEmail(),
    // Validate name length
    body('name').isLength({ min: 5 }),
    // Validate password length
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create the user
        const newUser = await User.create(req.body);

        // Log the newly created user
        console.log("New User:", newUser);

        // Send success response
        res.json({ success: true });
    } catch (error) {
        // Log any errors that occur during user creation
        console.error("Error creating user:", error);
        // Send error response
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route for user login
router.post("/loginuser", [
    // Validate email format
    body('email').isEmail(),
    // Validate password length
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const userData = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        // Compare passwords
        if (password !== userData.password) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        // Successful login
        res.json({ success: true });
    } catch (error) {
        // Log any errors that occur during login
        console.error("Error during login:", error);
        // Send error response
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
