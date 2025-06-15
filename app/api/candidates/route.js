// app/api/candidates/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET() {
    try {
        await connectToDB();
        const candidates = await Candidate.find({});

        return NextResponse.json({ success: true, data: candidates }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectToDB();

        const candidate = await Candidate.create(body);

        return NextResponse.json({ success: true, data: candidate }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}