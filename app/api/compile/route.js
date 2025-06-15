// app/api/compile/route.js
import { NextResponse } from 'next/server';
import { runAICodeAnalysis } from '@/lib/ai-service';
import { executeCode } from '@/lib/code-executor';
import { createCompilationLog } from '@/lib/db-service';

export async function POST(request) {
    try {
        const { code, language } = await request.json();

        if (!code) {
            return NextResponse.json({ error: 'No code provided' }, { status: 400 });
        }

        // Execute the code with the appropriate compiler/interpreter
        const executionResult = await executeCode(code, language);

        // Run AI analysis on the code
        const aiAnalysis = await runAICodeAnalysis(code, language, executionResult);

        // Log the compilation event to MongoDB
        await createCompilationLog({
            code,
            language,
            output: executionResult.output,
            error: executionResult.error,
            timestamp: new Date(),
        });

        // Return both execution result and AI suggestions
        return NextResponse.json({
            output: executionResult.error || executionResult.output,
            suggestions: aiAnalysis.suggestions,
            metrics: {
                executionTime: executionResult.executionTime,
                memoryUsage: executionResult.memoryUsage,
            }
        });
    } catch (error) {
        console.error('Compilation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}