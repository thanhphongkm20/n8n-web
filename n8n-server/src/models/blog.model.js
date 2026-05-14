import mongoose from "mongoose";

import {
  BLOG_STATUS,
  BLOG_TYPES,
} from "../configs/enum.js";

const blogSchema = new mongoose.Schema(
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

    excerpt: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(BLOG_TYPES),
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    seo_title: {
      type: String,
      default: "",
    },

    seo_description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(BLOG_STATUS),
      default: BLOG_STATUS.DRAFT,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    reading_time: {
      type: Number,
      default: 1,
    },

    view_count: {
      type: Number,
      default: 0,
    },

    published_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;