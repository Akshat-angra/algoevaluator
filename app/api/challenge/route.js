import { connectToDB } from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIChallenge() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Generate a real-world coding challenge in JSON format:
        {
            "title": "Title of the challenge",
            "description": "Detailed problem statement",
            "difficulty": "Easy | Medium | Hard",
            "testCases": [
                { "input": "Valid JSON string", "expectedOutput": "Valid JSON string" },
                { "input": "Valid JSON string", "expectedOutput": "Valid JSON string" }
            ]
        }
        Ensure all input and expected output values are **stringified JSON**. Avoid objects or arrays directly.
        `;

        const result = await model.generateContent([prompt]);
        const response = await result.response;
        const responseText = await response.text();

        const jsonStart = responseText.indexOf("{");
        const jsonEnd = responseText.lastIndexOf("}") + 1;
        const jsonData = responseText.substring(jsonStart, jsonEnd);

        let challengeData = JSON.parse(jsonData);

        // ✅ Convert test case inputs and outputs to strings
        challengeData.testCases = challengeData.testCases.map(tc => ({
            input: JSON.stringify(tc.input), // Ensure string format
            expectedOutput: JSON.stringify(tc.expectedOutput)
        }));

        return challengeData;
    } catch (error) {
        console.error("AI Challenge Generation Error:", error);
        return null;
    }
}


export async function GET() {
    try {
        await connectToDB();

        let challenge = await Challenge.findOne().sort({ createdAt: -1 });

        if (!challenge) {
            const aiChallenge = await generateAIChallenge();
            if (!aiChallenge) return NextResponse.json({ error: "AI failed to generate challenge" }, { status: 500 });

            challenge = new Challenge(aiChallenge);
            await challenge.save();
        }

        return NextResponse.json({ data: challenge }, { status: 200 });
    } catch (error) {
        console.error("Error fetching challenge:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
