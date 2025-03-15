import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    name: { type: String, required: true },
    email: {
        type: String,
        required: false,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
