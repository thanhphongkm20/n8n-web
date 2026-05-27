import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    description: { type: String, required: true },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    final_price: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    image: {
      type: String,
      default: null,
    },

    workflow: {
      type: String,
      default: null,
    },

    category: {
      type: String,
      default: "marketing",
      trim: true,
    },

    badge: {
      type: String,
      enum: ["hot", "new", "sale", "featured", "none"],
      default: "hot",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    sales_count: {
      type: Number,
      default: 0,
      min: 0,
    },

    node_count: {
      type: Number,
      default: 0,
      min: 0,
    },

    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

articleSchema.virtual("price_formatted").get(function () {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(this.final_price ?? this.price);
});

articleSchema.virtual("original_price_formatted").get(function () {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(this.price);
});

export default model("Article", articleSchema);