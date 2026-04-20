import { Schema } from "mongoose";

export const BaseSchema = (schema) => new Schema({
  ...schema,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) { delete ret._id; },
  },
});
