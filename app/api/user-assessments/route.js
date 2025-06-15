// app/api/user-assessments/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import UserAssessment from '@/models/UserAssessment';
import Assessment from '@/models/Assessment';i
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDB();

        const userId = session.user.id;

        const userAssessments = await UserAssessment.find({ userId })
            .populate('assessmentId')
            .sort({ updatedAt: -1 });

        return NextResponse.json({
            success: true,
            count: userAssessments.length,
            data: userAssessments
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch user assessments', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDB();

        const data = await request.json();
        const { assessmentId } = data;
        const userId = session.user.id;

        // Check if assessment exists
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment not found' },
                { status: 404 }
            );
        }

        // Check if user already started this assessment
        let userAssessment = await UserAssessment.findOne({ userId, assessmentId });

        if (userAssessment) {
            // Update existing record if it's not completed yet
            if (userAssessment.status !== 'completed') {
                userAssessment.status = 'in_progress';
                userAssessment.startedAt = new Date();
                await userAssessment.save();
            }
        } else {
            // Create a new record
            userAssessment = await UserAssessment.create({
                userId,
                assessmentId,
                status: 'in_progress',
                startedAt: new Date()
            });
        }

        // Update assessment attempts count
        await Assessment.findByIdAndUpdate(
            assessmentId,
            { $inc: { attempts: 1 } }
        );

        return NextResponse.json({
            success: true,
            data: userAssessment
        }, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to start assessment', error: error.message },
            { status: 500 }
        );
    }
}