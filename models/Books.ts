import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    size: { type: String, required: true },
    level: { type: String, required: true },
    downlaods: { type: String, required: true },
    pdfLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
