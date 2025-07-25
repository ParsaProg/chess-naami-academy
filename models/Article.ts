import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    cats: { type: [String], required: true },
    titleImage: { type: String, required: true },
    views: { type: String, default: "0" },
    likes: { type: String, default: "0" },
    importantText: { type: String, required: true },
    desc: { type: String, required: true },
    time: { type: String, required: true },
    publishDate: { type: String, required: true },
    publisherName: { type: String, required: true },
    publisherImage: { type: String, required: true },
    publisherTag: { type: String, required: true },
    comments: { type: String, default: "0" },
    isSpecial: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
