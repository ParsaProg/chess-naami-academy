import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    posterImage: {type: String, required: true},
    level: {type: String, required: true},
    time: {type: String, required: true},
    title: {type: String, required: true},
    views: {type: String, required: true},
    publisher: {type: String, required: true},
    videoLink: {type: String, required: true}, 
}, { timestamps: true });

export default mongoose.models.Videos || mongoose.model("Videos", VideoSchema);
