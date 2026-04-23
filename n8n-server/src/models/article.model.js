import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    slug: { type: String, required: true, unique: true, index: true },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

articleSchema.virtual("price_formatted").get(function () {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(this.price);
});

export default model("Article", articleSchema);