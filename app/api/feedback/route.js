import { getAuth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';
import Feedback from '@/models/feedback.model';
import { NextResponse } from 'next/server';

// POST: Submit feedback
export async function POST(req) {
    try {
        await connectToDB();
        const { userId } = getAuth(req);  // Use getAuth instead of auth()
        const { name, email, message, rating } = await req.json();

        if (!name || !message || rating === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const feedback = new Feedback({ userId, name, email, message, rating });
        await feedback.save();

        return NextResponse.json({ success: true, message: 'Feedback submitted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}

// GET: Fetch all feedback
export async function GET() {
    try {
        await connectToDB();
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        return NextResponse.json(feedbacks);
    } catch (error) {
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}
