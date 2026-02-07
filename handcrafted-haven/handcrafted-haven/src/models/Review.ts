import mongoose, { Schema, model, models } from "mongoose";
import { maxLength, required } from "zod/mini";

const ReviewSchema = new Schema(
  {
    
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = models.Review || mongoose.model("Review", ReviewSchema);

export default Review;