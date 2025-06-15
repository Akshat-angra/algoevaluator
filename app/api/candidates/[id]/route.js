import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET(request, { params }) {
    try {
        // Access the id directly from params
        const { id } = params;
        await connectToDB();

        const candidate = await Candidate.findById(id);

        if (!candidate) {
            return NextResponse.json({ success: false, message: 'Candidate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: candidate }, { status: 200 });
    } catch (error) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        // Access the id directly from params
        const { id } = params;
        const body = await request.json();
        await connectToDB();

        const candidate = await Candidate.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (!candidate) {
            return NextResponse.json({ success: false, message: 'Candidate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: candidate }, { status: 200 });
    } catch (error) {
        console.error('Error updating candidate:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        // Access the id directly from params
        const { id } = params;
        await connectToDB();

        const candidate = await Candidate.findByIdAndDelete(id);

        if (!candidate) {
            return NextResponse.json({ success: false, message: 'Candidate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        console.error('Error deleting candidate:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}