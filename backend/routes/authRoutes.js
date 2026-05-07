const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// SIGNUP

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER

    const newUser = new User({

      name,
      email,
      password: hashedPassword

    });

    await newUser.save();

    res.status(201).json({

      success: true,
      message: "Signup Successful"

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({

        success: false,
        message: "User not found"

      });

    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,
        message: "Invalid Password"

      });

    }

    // TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      "SECRETKEY",

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      success: true,
      message: "Login Successful",
      token

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

});

module.exports = router;