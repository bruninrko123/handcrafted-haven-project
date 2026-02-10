import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema({
  artisanId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model if it doesn't exis
const Post = models.Post || mongoose.model("Post", PostSchema);

export default Post;
