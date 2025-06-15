import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    testCases: [{ input: String, expectedOutput: String }],
}, { timestamps: true });

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);
