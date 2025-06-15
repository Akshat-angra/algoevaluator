import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true
  },
  solvedProblems: {
    type: [String], // Array of problem IDs
    default: []
  },
  attempts: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastStreak: {
    type: Date,
    default: null
  },
  lastWeekStreak: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);
export default UserProgress;