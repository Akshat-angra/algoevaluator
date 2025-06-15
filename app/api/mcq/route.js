// import { connectToDB } from "@/lib/mongodb";
// import MCQ from "@/models/mcq.model";
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//     try {
//         await connectToDB();
//         const { topic, difficulty } = await req.json();

//         if (!topic || !difficulty) {
//             return NextResponse.json({ error: "Topic and difficulty are required." }, { status: 400 });
//         }

//         const prompt = `Generate 5 multiple-choice questions on ${topic} at ${difficulty} level. Each should have:
//         - A question
//         - 4 answer options (A, B, C, D)
//         - The correct answer (A, B, C, or D)
//         - A brief explanation.
//         - Include "topic": "${topic}" and "difficulty": "${difficulty}" in each question object.
//         Return only a valid JSON array without any additional text or formatting. Example:
//         [
//           {
//             "question": "What is the capital of France?",
//             "options": ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
//             "correctAnswer": "C",
//             "explanation": "Paris is the capital of France.",
//             "topic": "${topic}",
//             "difficulty": "${difficulty}"
//           }
//         ]`;

//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const result = await model.generateContent(prompt);

//         console.log("🔍 Gemini Raw Response:", result);

//         // Get the AI-generated text response
//         const textResponse = await result.response.text();
//         if (!textResponse) {
//             console.error("❌ AI response is empty or invalid");
//             return NextResponse.json({ error: "AI response is empty or invalid" }, { status: 500 });
//         }

//         console.log("📜 AI Text Response:", textResponse);

//         // Clean and extract JSON from the AI response
//         const cleanedText = textResponse.replace(/```json\s*|\s*```/g, "").trim();

//         let mcqs;
//         try {
//             mcqs = JSON.parse(cleanedText);
//         } catch (error) {
//             console.error("❌ JSON Parsing Error:", error.message);
//             return NextResponse.json({ error: "Invalid JSON format from AI", details: error.message }, { status: 500 });
//         }

//         if (!Array.isArray(mcqs)) {
//             console.error("❌ AI did not return a valid MCQ list:", mcqs);
//             return NextResponse.json({ error: "AI did not return a valid MCQ list" }, { status: 500 });
//         }

//         // Ensure each MCQ contains topic and difficulty before inserting into MongoDB
//         mcqs = mcqs.map(mcq => ({ ...mcq, topic, difficulty }));

//         const savedMCQs = await MCQ.insertMany(mcqs);
//         console.log("✅ Successfully saved MCQs to MongoDB:", savedMCQs);

//         return NextResponse.json({ success: true, data: savedMCQs });
//     } catch (error) {
//         console.error("❌ AI MCQ generation failed:", error.message);
//         return NextResponse.json({ error: "AI MCQ generation failed", details: error.message }, { status: 500 });
//     }
// }



import { connectToDB } from "../../../../lib/mongodb";
import MCQ from "@/models/mcq.model";
import { NextResponse } from "next/server";

// 📌 Get MCQs for Quiz
export async function GET() {
    try {
        await connectToDB();
        const mcqs = await MCQ.find({}, { correctAnswer: 0 }); // Hide correct answers
        return NextResponse.json({ success: true, data: mcqs });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching MCQs", details: error.message }, { status: 500 });
    }
}
