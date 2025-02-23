import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type:String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    properties: {
      type: Object,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "discontinued"],
      default: "in_stock",
      required: true,
    },
  },
  { timestamps: true }
);

export const productModel = models.Product || model("Product", productSchema);
