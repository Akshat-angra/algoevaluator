import mongoose from "mongoose";

const ActiveUserSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    lastActive: { type: Date, default: Date.now },
});

export default mongoose.models.ActiveUser || mongoose.model("ActiveUser", ActiveUserSchema);
