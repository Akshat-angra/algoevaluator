// app/api/save/route.js
import { NextResponse } from 'next/server';
import { saveCodeSnippet } from '@/lib/db-service';

export async function POST(request) {
    try {
        const { code, language } = await request.json();

        if (!code) {
            return NextResponse.json({ error: 'No code provided' }, { status: 400 });
        }

        // Save the code snippet to MongoDB
        const savedSnippet = await saveCodeSnippet({
            code,
            language,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            message: 'Code saved successfully',
            snippetId: savedSnippet._id,
        });
    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}