import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    constraints: {
        type: String,
        required: true,
    },
    exampleInput: {
        type: String,
        required: true,
    },
    exampleOutput: {
        type: String,
        required: true,
    },
    testCases: [{
        input: {
            type: String,
            required: true,
        },
        output: {
            type: String,
            required: true,
        },
        isHidden: {
            type: Boolean,
            default: false,
        }
    }],
    timeLimit: {
        type: Number,
        default: 1000, // in milliseconds
    },
    memoryLimit: {
        type: Number,
        default: 128, // in MB
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true,
    }
});

export default mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);