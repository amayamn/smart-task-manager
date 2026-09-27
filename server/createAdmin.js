const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");


// =====================================
// CREATE ADMIN
// =====================================

const createAdmin = async () => {

    try {

        console.log("Connecting to MongoDB...");

        // Use the SAME MONGO_URI as server.js
        const conn = await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            `MongoDB Connected: ${conn.connection.host}`
        );


        // Check if admin already exists
        let admin = await User.findOne({
            email: "admin@gmail.com"
        });


        // =====================================
        // ADMIN ALREADY EXISTS
        // =====================================

        if (admin) {

            console.log(
                "Admin already exists. Resetting account..."
            );

            const hashedPassword =
                await bcrypt.hash("admin123", 10);

            admin.name = "Administrator";
            admin.password = hashedPassword;
            admin.isAdmin = true;

            await admin.save();

            console.log(
                "Admin account reset successfully!"
            );

        }


        // =====================================
        // CREATE NEW ADMIN
        // =====================================

        else {

            const hashedPassword =
                await bcrypt.hash("admin123", 10);

            admin = new User({

                name: "Administrator",

                email: "admin@gmail.com",

                password: hashedPassword,

                isAdmin: true,

                lastLogin: null
            });

            await admin.save();

            console.log(
                "Admin created successfully!"
            );
        }


        console.log("");
        console.log("==============================");
        console.log("ADMIN LOGIN DETAILS");
        console.log("==============================");
        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");
        console.log("==============================");


    } catch (error) {

        console.error(
            "Error creating admin:"
        );

        console.error(error);

    } finally {

        await mongoose.connection.close();

        console.log(
            "MongoDB connection closed."
        );
    }
};


// Run
createAdmin();