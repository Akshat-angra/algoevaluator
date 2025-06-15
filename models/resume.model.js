import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    skills: { type: [String], required: true },
    experience: { type: String, required: true },
    summary: { type: String },
    work_experience: { type: Array },
    education: { type: Array },
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
