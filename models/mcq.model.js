import mongoose from "mongoose";

const MCQSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, required: true },
    userAnswer: { type: String, default: null },  // Store user's selected option (A, B, C, D)
    isCorrect: { type: Boolean, default: null }   // Whether the answer is correct
});

const MCQ = mongoose.models.MCQ || mongoose.model("MCQ", MCQSchema);
export default MCQ;
