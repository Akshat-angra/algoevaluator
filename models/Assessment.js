// models/Assessment.js
import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an assessment title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    company: {
        type: String,
        required: [true, 'Please specify the company'],
        trim: true
    },
    companyLogo: {
        type: String,
        default: '/images/default-company.png'
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Intermediate'
    },
    questions: {
        type: Number,
        required: true,
        min: [1, 'Assessment must have at least 1 question']
    },
    timeLimit: {
        type: Number,
        required: true,
        min: [5, 'Time limit must be at least 5 minutes']
    },
    category: {
        type: String,
        required: true,
        enum: ['Algorithms', 'Data Structures', 'System Design', 'Frontend', 'Backend', 'Database', 'DevOps', 'Machine Learning']
    },
    completionRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    attempts: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);