import mongoose from 'mongoose';

const DailyChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Challenge title is required']
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: [true, 'Associated problem ID is required']
  },
  tags: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required']
  }
});

const DailyChallenge = mongoose.models.DailyChallenge || mongoose.model('DailyChallenge', DailyChallengeSchema);
export default DailyChallenge;