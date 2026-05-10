const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

// GET ALL PRODUCTS

router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// ADD PRODUCT

router.post("/add", async (req, res) => {

  try {

    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Added",
      product: newProduct
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;