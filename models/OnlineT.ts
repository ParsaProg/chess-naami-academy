import mongoose from "mongoose";

const OnlineTSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true },
    participants: { type: Number, required: true },
    ratingCategory: { type: String, required: true },
    minRating: { type: Number, required: false },
    maxRating: { type: Number, required: false },
    lichessUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OnlineT ||
  mongoose.model("OnlineT", OnlineTSchema);
