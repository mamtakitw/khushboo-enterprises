const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

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

// GET PRODUCTS

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

// DELETE PRODUCT

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;