// models/Candidate.js
import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        unique: true
    },
    position: {
        type: String,
        required: [true, 'Please specify the position']
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['applied', 'screening', 'interview', 'offer', 'rejected'],
        default: 'applied'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);