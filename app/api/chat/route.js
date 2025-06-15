// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { connectToDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
    try {
        // Get current user using getAuth instead of auth
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request body
        const { message, conversationId } = await request.json();

        // Connect to database
        await connectToDB();

        // Find the conversation or return error
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        // Save user message
        const userMessage = new Message({
            conversationId,
            content: message,
            role: 'user',
            userId,
            sender: 'user', // Or maybe the userId again
        });
        await userMessage.save();

        // Update conversation title if it's a new conversation
        if (conversation.title === "New Conversation") {
            // Use the first 30 chars of message as title
            const newTitle = message.length > 30 ? message.substring(0, 30) + "..." : message;
            conversation.title = newTitle;
            await conversation.save();
        }

        // Update conversation's updatedAt timestamp
        conversation.updatedAt = new Date();
        await conversation.save();

        // Get conversation history for context
        const history = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 }).limit(20);

        // Format history for Gemini
        // const chatHistory = history.map(msg => ({
        //     role: msg.role,
        //     parts: [{ text: msg.content }],
        // }));

        const chatHistory = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : msg.role,
            parts: [{ text: msg.content }],
        }));


        // Create a chat session with history
        const chat = model.startChat({
            history: chatHistory.slice(0, -1), // Exclude the latest message
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });

        // Send message to Gemini
        const result = await chat.sendMessage(message);
        const aiResponse = result.response.text();

        // Save AI response
        const assistantMessage = new Message({
            conversationId,
            content: aiResponse,
            role: 'assistant',
            userId,
            sender: 'assistant', // Or something like 'ai'
        });
        await assistantMessage.save();

        return NextResponse.json({ response: aiResponse });
    } catch (error) {
        console.error('Error in chat processing:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}