import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import ActiveUser from "@/models/ActiveUser";

export async function POST(req) {
    try {
        await connectToDB();

        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await ActiveUser.findOneAndUpdate(
            { userId },
            { userId, lastActive: new Date() },
            { upsert: true }
        );

        return NextResponse.json({ message: "User activity updated" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating activity:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDB();

        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        await ActiveUser.deleteMany({ lastActive: { $lt: tenMinutesAgo } });

        const activeUsers = await ActiveUser.countDocuments();
        return NextResponse.json({ activeUsers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
