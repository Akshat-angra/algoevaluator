// app/api/messages/route.js
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';

export async function GET(request) {
    try {
        // Get current user using getAuth instead of auth
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get conversation ID from query parameters
        const { searchParams } = new URL(request.url);
        const conversationId = searchParams.get('conversationId');

        if (!conversationId) {
            return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
        }

        // Connect to database
        await connectToDB();

        // Verify conversation belongs to user
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        // Find all messages for the conversation
        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 })
            .lean();

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}