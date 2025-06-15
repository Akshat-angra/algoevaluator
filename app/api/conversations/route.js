// app/api/conversations/route.js
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';

export async function GET(request) {
    try {
        // Get current user using getAuth instead of auth
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Connect to database
        await connectToDB();

        // Find all conversations for the user
        const conversations = await Conversation.find({ userId })
            .sort({ updatedAt: -1 })
            .lean();

        return NextResponse.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch conversations' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        // Get current user using getAuth instead of auth
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request body
        const { title = 'New Conversation' } = await request.json();

        // Connect to database
        await connectToDB();

        // Create new conversation
        const conversation = new Conversation({
            title,
            userId,
        });

        await conversation.save();

        return NextResponse.json(conversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        return NextResponse.json(
            { error: 'Failed to create conversation' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        // Get current user using getAuth instead of auth
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get conversation ID from query parameters
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
        }

        // Connect to database
        await connectToDB();

        // Find and delete conversation
        const result = await Conversation.deleteOne({
            _id: id,
            userId
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        // Delete all messages associated with the conversation
        await Message.deleteMany({ conversationId: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        return NextResponse.json(
            { error: 'Failed to delete conversation' },
            { status: 500 }
        );
    }
}