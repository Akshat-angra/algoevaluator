import mongoose from 'mongoose';

const UserSkillSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    accuracy: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    solvedProblems: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.UserSkill || mongoose.model('UserSkill', UserSkillSchema);
