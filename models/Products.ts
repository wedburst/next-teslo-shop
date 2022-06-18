import { IProduct } from "interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const productSchema = new Schema({
  description: { type: String, required: true },
  images: [{ type: String }],
  inStock: { type: String, required: true, default: 0 },
  price: { type: String, required: true, default: 0 },
  sizes: [
    {
      type: String,
      enum: {
        values: ["S", "M", "L", "XL", "XXL"],
        message: "Sizes must be S,M,L,XL,XXL",
      },
    },
  ],
  slug: { type: String, required: true, unique: true },
  tags: { type: String },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: {
      values: ["shirt, pant", "shirt, skirt", "pant, skirt"],
      message: "{VALUE} is not a valid type",
    },
  },
  gender: { 
    type: String,
    enum: {
      values: ["men", "women", "kid", "unisex"],
      message: "{VALUE} is not a valid type",
    },
   },
},
{
    timestamps: true
});

// Crear indice de busqueda

const Product: Model<IProduct> = mongoose.models.product || model('Product', productSchema);

export default Product;