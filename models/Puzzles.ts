import mongoose from "mongoose";

const PuzzlesSchema = new mongoose.Schema({
    puzzleImage: {type: String, required: true},
    level: {type: String, required: true},
    rating: {type: Number, required: true},
    title: {type: String, required: true},
    solved: {type: Number, required: true},
    cats: {type: Array, required: true},
    answers: {type: Array, required: true},
    correctAnswer: {type: String, required: true}

}, {timestamps: true});

export default mongoose.models.Puzzles || mongoose.model("Puzzles", PuzzlesSchema)