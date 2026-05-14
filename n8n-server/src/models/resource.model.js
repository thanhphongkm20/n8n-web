import mongoose from "mongoose";
import { RESOURCE_TYPES, RESOURCE_STATUS } from "../configs/enum.js";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(RESOURCE_TYPES),
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    download_url: {
      type: String,
      default: "",
    },

    external_url: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(RESOURCE_STATUS),
      default: RESOURCE_STATUS.DRAFT,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    view_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;