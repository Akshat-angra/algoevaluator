// api/applications/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request) {
    try {
        await connectToDB();

        const data = await request.json();

        // Validate required fields
        const requiredFields = ['fullName', 'email', 'position', 'experience', 'skills', 'resume'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: `Missing required field: ${field}`
                    }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }
        }

        // Create new application
        const application = new Application(data);
        await application.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Application submitted successfully',
                applicationId: application._id
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error submitting application:', error);

        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to submit application',
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}