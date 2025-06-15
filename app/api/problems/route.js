import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDB } from '@/lib/mongodb';
import Problem from '@/models/Problem';

export async function GET(request) {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    try {
        const { searchParams } = new URL(request.url);
        const difficulty = searchParams.get('difficulty');
        const search = searchParams.get('search');

        let query = {};

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const problems = await Problem.find(query)
            .select('title difficulty createdAt')
            .sort({ createdAt: -1 });

        return NextResponse.json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    try {
        const body = await request.json();
        const { title, description, difficulty, constraints, exampleInput, exampleOutput, testCases } = body;

        if (!title || !description || !difficulty || !constraints || !exampleInput || !exampleOutput || !testCases) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const problem = new Problem({
            title,
            description,
            difficulty,
            constraints,
            exampleInput,
            exampleOutput,
            testCases,
            createdBy: userId,
        });

        await problem.save();

        return NextResponse.json(problem);
    } catch (error) {
        console.error('Error creating problem:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}