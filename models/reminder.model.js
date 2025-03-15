import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    reminderTime: { type: Date, required: true },
    message: { type: String, default: "Time to revisit this problem!" },
    isNotified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
