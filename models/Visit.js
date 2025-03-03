import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    date: { type: String, unique: true },
    count: { type: Number, default: 1 },
});

export default mongoose.models.Visit || mongoose.model("Visit", visitSchema);
