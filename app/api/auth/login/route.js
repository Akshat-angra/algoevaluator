import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
    try {
        console.log("🔍 Fetching Clerk auth...");
        const { userId } = auth();

        if (!userId) {
            console.error("❌ Unauthorized: No user ID found.");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();

        // Find user and update last login time
        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { lastLogin: new Date() },
            { new: true }
        );

        if (!user) {
            console.error("❌ User not found in DB.");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("✅ User login recorded:", user);
        return NextResponse.json({ message: "Login recorded", user }, { status: 200 });
    } catch (error) {
        console.error("❌ Error recording login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
