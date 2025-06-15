// models/Conversation.js
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'New Conversation'
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Check if model already exists to prevent OverwriteModelError during development hot reloads
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

export default Conversation;