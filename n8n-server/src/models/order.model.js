import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    transferCode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "expired", "cancelled"],
      default: "pending",
    },
    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);