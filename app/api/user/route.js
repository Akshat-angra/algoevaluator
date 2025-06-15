import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { clerkId, email, firstName, lastName, imageUrl } = await request.json();
        const { db } = await connectToDB();

        let user = await db.collection('users').findOne({ clerkId });

        if (!user) {
            const newUser = {
                clerkId,
                email,
                name: `${firstName} ${lastName}`.trim(),
                imageUrl: imageUrl || '',
                lastLogin: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                __v: 0
            };

            const result = await db.collection('users').insertOne(newUser);
            newUser._id = result.insertedId;

            return NextResponse.json({ user: newUser }, { status: 200 });
        } else {
            const updates = {
                email,
                name: `${firstName} ${lastName}`.trim(),
                lastLogin: new Date(),
                updatedAt: new Date()
            };

            if (imageUrl) {
                updates.imageUrl = imageUrl;
            }

            await db.collection('users').updateOne(
                { clerkId },
                { $set: updates }
            );

            const updatedUser = await db.collection('users').findOne({ clerkId });

            return NextResponse.json({ user: updatedUser }, { status: 200 });
        }
    } catch (error) {
        console.error('Error handling user request:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}