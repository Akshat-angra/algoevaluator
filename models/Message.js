// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  sender: {             // 🔥 ADD THIS FIELD
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if model already exists to prevent OverwriteModelError during development hot reloads
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;