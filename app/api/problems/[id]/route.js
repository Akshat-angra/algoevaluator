import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDB } from '@/lib/mongodb';
import Problem from '@/models/Problem';

export async function GET(request, { params }) {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    try {
        const { id } = params;
        const problem = await Problem.findById(id);

        if (!problem) {
            return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
        }

        // Hide hidden test cases outputs for regular users
        if (problem.createdBy !== userId) {
            problem.testCases = problem.testCases.map(testCase => {
                if (testCase.isHidden) {
                    return {
                        ...testCase.toObject(),
                        output: '(hidden)'
                    };
                }
                return testCase;
            });
        }

        return NextResponse.json(problem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}