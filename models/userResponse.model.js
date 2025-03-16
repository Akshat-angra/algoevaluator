import mongoose from "mongoose";

const UserResponseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: "MCQ", required: true },
    selectedOption: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.UserResponse || mongoose.model("UserResponse", UserResponseSchema);