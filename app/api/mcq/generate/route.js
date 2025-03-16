import { connectToDB } from "@/lib/mongodb";
import MCQ from "@/models/mcq.model";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        await connectToDB();
        const { topic, difficulty } = await req.json();

        if (!topic || !difficulty) {
            return NextResponse.json({ error: "Topic and difficulty are required." }, { status: 400 });
        }

        const prompt = `Generate 5 multiple-choice questions on ${topic} at ${difficulty} level. Each should have:
        - A question
        - 4 answer options (A, B, C, D)
        - The correct answer (A, B, C, or D)
        - A brief explanation.
        - Include "topic": "${topic}" and "difficulty": "${difficulty}" in each question object.
        Return only a valid JSON array without any additional text or formatting. Example:
        [
          {
            "question": "What is the capital of France?",
            "options": ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
            "correctAnswer": "C",
            "explanation": "Paris is the capital of France.",
            "topic": "${topic}",
            "difficulty": "${difficulty}"
          }
        ]`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);

        const textResponse = await result.response.text();
        if (!textResponse) return NextResponse.json({ error: "AI response is empty or invalid" }, { status: 500 });

        const cleanedText = textResponse.replace(/```json\s*|\s*```/g, "").trim();

        let mcqs;
        try {
            mcqs = JSON.parse(cleanedText);
        } catch (error) {
            return NextResponse.json({ error: "Invalid JSON format from AI", details: error.message }, { status: 500 });
        }

        if (!Array.isArray(mcqs)) {
            return NextResponse.json({ error: "AI did not return a valid MCQ list" }, { status: 500 });
        }

        mcqs = mcqs.map(mcq => ({ ...mcq, topic, difficulty }));

        const savedMCQs = await MCQ.insertMany(mcqs);
        return NextResponse.json({ success: true, data: savedMCQs });
    } catch (error) {
        return NextResponse.json({ error: "AI MCQ generation failed", details: error.message }, { status: 500 });
    }
}
