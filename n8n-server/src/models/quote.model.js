import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  budget: { type: String, required: true },
  timeline: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

export const Quote = mongoose.model("Quote", quoteSchema);