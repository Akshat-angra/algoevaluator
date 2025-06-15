import { connectToDB } from "../../../../lib/mongodb";
import MCQ from "@/models/mcq.model";
import { NextResponse } from "next/server";

// 📌 Submit Quiz Answers
export async function POST(req) {
    try {
        await connectToDB();
        const { answers } = await req.json();

        if (!answers || !Array.isArray(answers)) {
            return NextResponse.json({ error: "Invalid answers format." }, { status: 400 });
        }

        let score = 0;
        const results = [];

        for (const { mcqId, userAnswer } of answers) {
            const mcq = await MCQ.findById(mcqId);

            if (!mcq) {
                return NextResponse.json({ error: `MCQ with ID ${mcqId} not found.` }, { status: 404 });
            }

            const isCorrect = mcq.correctAnswer === userAnswer;
            if (isCorrect) score++;

            results.push({ mcqId, question: mcq.question, userAnswer, isCorrect });
        }

        return NextResponse.json({
            success: true,
            totalQuestions: answers.length,
            correctAnswers: score,
            percentage: answers.length > 0 ? (score / answers.length) * 100 : 0,
            results
        });
    } catch (error) {
        return NextResponse.json({ error: "Error submitting answers", details: error.message }, { status: 500 });
    }
}
