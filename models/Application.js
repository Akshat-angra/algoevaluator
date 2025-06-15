// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        trim: true,
        lowercase: true,
    },
    position: {
        type: String,
        required: [true, 'Please specify the position you are applying for'],
        trim: true,
    },
    experience: {
        type: String,
        required: [true, 'Please provide your years of experience'],
        trim: true,
    },
    skills: {
        type: [String],
        required: [true, 'Please provide at least one skill'],
    },
    resume: {
        type: String,
        required: [true, 'Please provide a link to your resume'],
        trim: true,
    },
    coverLetter: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);