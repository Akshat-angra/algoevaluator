import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    savedCodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodeSnippet'
    }],
    lastLogin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User