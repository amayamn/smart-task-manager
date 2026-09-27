const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// =====================================
// ADMIN LOGIN
// =====================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }


        // Find user
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid admin email or password"
            });
        }


        // Check admin account
        if (user.isAdmin !== true) {
            return res.status(403).json({
                message: "Access denied. You are not an admin."
            });
        }


        // Check password
        const passwordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Invalid admin email or password"
            });
        }


        // Update admin last login
        user.lastLogin = new Date();

        await user.save();


        // Create admin JWT
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                isAdmin: true
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Send response
        res.json({

            message: "Admin login successful",

            token,

            admin: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: true,
                lastLogin: user.lastLogin
            }

        });

    } catch (error) {

        console.error(
            "Admin login error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =====================================
// GET USERS
// =====================================

router.get("/users", async (req, res) => {

    try {

        const users = await User.find(
            { isAdmin: false },
            {
                name: 1,
                email: 1,
                lastLogin: 1,
                createdAt: 1
            }
        ).sort({
            lastLogin: -1
        });


        res.json({
            users
        });

    } catch (error) {

        console.error(
            "Get users error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;