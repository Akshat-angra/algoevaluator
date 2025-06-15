// models/UserAssessment.js
import mongoose from 'mongoose';

const UserAssessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed', 'expired'],
        default: 'not_started'
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    score: {
        type: Number
    },
    timeSpent: {
        type: Number // in minutes
    },
    answers: [{
        questionId: String,
        userAnswer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        timeSpent: Number // in seconds
    }],
    correctAnswers: {
        type: Number,
        default: 0
    },
    certificateIssued: {
        type: Boolean,
        default: false
    },
    certificateUrl: {
        type: String
    }
}, {
    timestamps: true
});

// Create a compound index to ensure a user can only have one record per assessment
UserAssessmentSchema.index({ userId: 1, assessmentId: 1 }, { unique: true });

export default mongoose.models.UserAssessment || mongoose.model('UserAssessment', UserAssessmentSchema);