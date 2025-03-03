import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
    if (!MONGO_URI) {
        console.error("⚠️ MongoDB URI is missing in .env.local");
        return;
    }

    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};
