const mongoose = require("mongoose");
const productTypes = require('./productTypes');
const { Schema } = mongoose;

const productSchema = new Schema({
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
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: 'Farm'
  }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;