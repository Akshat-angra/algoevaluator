// app/api/user-assessments/[id]/submit/route.js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import UserAssessment from '@/models/UserAssessment';
import Assessment from '@/models/Assessment';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import mongoose from 'mongoose';

export async function POST(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDB();

        const { id } = params;
        const data = await request.json();
        const { answers, timeSpent } = data;
        const userId = session.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid assessment ID format' },
                { status: 400 }
            );
        }

        // Find the user assessment record
        const userAssessment = await UserAssessment.findOne({
            userId,
            assessmentId: id,
            status: { $ne: 'completed' }
        });

        if (!userAssessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment session not found or already completed' },
                { status: 404 }
            );
        }

        // Get the assessment to calculate score
        const assessment = await Assessment.findById(id);
        if (!assessment) {
            return NextResponse.json(
                { success: false, message: 'Assessment not found' },
                { status: 404 }
            );
        }

        // Process answers and calculate score (this would be more complex in a real app)
        const correctAnswersCount = answers.filter(answer => answer.isCorrect).length;
        const score = Math.round((correctAnswersCount / answers.length) * 100);

        // Update user assessment record
        userAssessment.status = 'completed';
        userAssessment.completedAt = new Date();
        userAssessment.answers = answers;
        userAssessment.score = score;
        userAssessment.timeSpent = timeSpent;
        userAssessment.correctAnswers = correctAnswersCount;

        if (score >= 70) {
            userAssessment.certificateIssued = true;
            userAssessment.certificateUrl = `/certificates/${userAssessment._id}`;
        }

        await userAssessment.save();

        // Update assessment stats
        const allCompletedAssessments = await UserAssessment.find({
            assessmentId: id,
            status: 'completed'
        });

        const totalScores = allCompletedAssessments.reduce((sum, item) => sum + (item.score || 0), 0);
        const averageScore = allCompletedAssessments.length ? Math.round(totalScores / allCompletedAssessments.length) : 0;

        await Assessment.findByIdAndUpdate(id, {
            averageScore,
            completionRate: Math.round((allCompletedAssessments.length / assessment.attempts) * 100)
        });

        return NextResponse.json({
            success: true,
            data: {
                score,
                correctAnswers: correctAnswersCount,
                totalQuestions: answers.length,
                certificateIssued: userAssessment.certificateIssued,
                certificateUrl: userAssessment.certificateUrl
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to submit assessment', error: error.message },
            { status: 500 }
        );
    }
}