const mongoose = require("mongoose");
const productTypes = require('./productTypes');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    lowercase: true,
    enum: productTypes
  }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;