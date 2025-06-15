// app/api/assessments/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Assessment from '@/models/Assessment';

export async function GET(request) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const difficulty = searchParams.get('difficulty') || '';
        const company = searchParams.get('company') || '';
        const category = searchParams.get('category') || '';
        const limit = parseInt(searchParams.get('limit') || '100');
        const page = parseInt(searchParams.get('page') || '1');
        const skip = (page - 1) * limit;

        const query = { isActive: true };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        if (difficulty && difficulty !== 'All') {
            query.difficulty = difficulty;
        }

        if (company) {
            query.company = { $regex: company, $options: 'i' };
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        const assessments = await Assessment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Assessment.countDocuments(query);

        return NextResponse.json({
            success: true,
            count: assessments.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: assessments
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch assessments', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectToDB();

        const data = await request.json();

        const assessment = await Assessment.create(data);

        return NextResponse.json({
            success: true,
            data: assessment
        }, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create assessment', error: error.message },
            { status: 500 }
        );
    }
}