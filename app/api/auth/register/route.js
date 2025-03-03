import { getAuth } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
    try {
        console.log("🔍 Connecting to MongoDB...");
        await connectToDB();

        console.log("🔍 Fetching Clerk auth...");
        const { userId } = getAuth(req);

        if (!userId) {
            console.error("❌ Unauthorized: No user ID found.");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ Authenticated User ID:", userId);

        console.log("🔍 Fetching Clerk user details...");
        const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
        }).then((res) => res.json());

        if (!user) {
            console.error("❌ Clerk user not found.");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("🔍 Checking if user exists in MongoDB...");
        let existingUser = await User.findOne({ clerkId: userId });

        if (!existingUser) {
            console.log("🆕 Creating new user in MongoDB...");
            existingUser = await User.create({
                clerkId: userId,
                email: user.email_addresses[0]?.email_address || "",
                name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
                imageUrl: user.image_url,
            });
            console.log("✅ User created successfully:", existingUser);
        } else {
            console.log("ℹ️ User already exists:", existingUser);
        }

        return NextResponse.json({ user: existingUser });
    } catch (error) {
        console.error("❌ Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
