import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

//create a new model if it doesn't exist
const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
