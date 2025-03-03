import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

export async function POST() {
    try {
        await connectToDB();

        const today = new Date().toISOString().split("T")[0];

        let visit = await Visit.findOne({ date: today });

        if (visit) {
            visit.count += 1;
            await visit.save();
        } else {
            visit = await Visit.create({ date: today, count: 1 });
        }

        return NextResponse.json({ dailyVisits: visit.count });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update visits" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDB();
        const today = new Date().toISOString().split("T")[0];
        const visit = await Visit.findOne({ date: today });

        return NextResponse.json({ dailyVisits: visit ? visit.count : 0 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch visits" }, { status: 500 });
    }
}
