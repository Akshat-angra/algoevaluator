// app/api/assessments/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Assessment from '@/models/Assessment';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
    try {
        await connectToDB();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid assessment ID format' },
                { status: 400 }
            );
        }

        const assessment = await Assessment.findById(id);

        if (!assessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: assessment
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch assessment', error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDB();

        const { id } = params;
        const data = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid assessment ID format' },
                { status: 400 }
            );
        }

        const assessment = await Assessment.findByIdAndUpdate(
            id,
            { ...data, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!assessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: assessment
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update assessment', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid assessment ID format' },
                { status: 400 }
            );
        }

        const assessment = await Assessment.findByIdAndDelete(id);

        if (!assessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Assessment deleted successfully'
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete assessment', error: error.message },
            { status: 500 }
        );
    }
}