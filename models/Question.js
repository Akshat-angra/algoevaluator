import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  expectedOutput: String,
  constraints: String,
  timeLimit: {
    type: Number, // in milliseconds
    default: 5000,
  },
  memoryLimit: {
    type: Number, // in MB
    default: 512,
  },
  createdBy: {
    type: String, // Clerk User ID
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);