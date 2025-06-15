import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDB } from '@/lib/mongodb';
import Submission from '@/models/Submission';
import Interview from '@/models/Interview';

// Get submissions 
export async function GET(req) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDB();

        const { searchParams } = new URL(req.url);
        const interviewId = searchParams.get('interviewId');

        if (!interviewId) {
            return NextResponse.json({ error: 'Interview ID is required' }, { status: 400 });
        }

        // Check if user has access to this interview
        const interview = await Interview.findById(interviewId);
        if (!interview) {
            return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
        }

        let submissions;

        // If user is the interviewer, they can see all submissions
        if (interview.createdBy === userId) {
            submissions = await Submission.find({ interviewId });
        } else {
            // If user is an interviewee, they can only see their own submissions
            submissions = await Submission.find({ interviewId, userId });
        }

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Get submissions error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
