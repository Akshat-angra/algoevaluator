import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectToDB();

        const { userId, lastLogin } = await req.json();

        if (!userId || !lastLogin) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { lastLogin },
            { upsert: true, new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found or could not be updated" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Login tracked", lastLogin });
    } catch (error) {
        console.error("Error in login tracking:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
