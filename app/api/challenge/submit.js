import { connectToDB } from '@/lib/mongodb';
import UserSkill from '@/models/UserSkill';
import Challenge from '@/models/Challenge';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req) {
    try {
        await connectToDB();
        const { userId } = getAuth(req);
        if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        const { challengeId, executionTime, isCorrect } = await req.json();

        // Find user skill profile
        let userSkill = await UserSkill.findOne({ userId });

        if (!userSkill) {
            userSkill = await UserSkill.create({ userId });
        }

        // Update accuracy & speed
        userSkill.solvedProblems += 1;
        if (isCorrect) userSkill.accuracy = ((userSkill.accuracy * (userSkill.solvedProblems - 1)) + 1) / userSkill.solvedProblems;
        userSkill.speed = ((userSkill.speed * (userSkill.solvedProblems - 1)) + executionTime) / userSkill.solvedProblems;

        // Adjust difficulty based on accuracy & speed
        if (userSkill.accuracy > 0.8 && userSkill.speed < 3) {
            userSkill.difficultyLevel = "Hard";
        } else if (userSkill.accuracy > 0.5) {
            userSkill.difficultyLevel = "Medium";
        } else {
            userSkill.difficultyLevel = "Easy";
        }

        await userSkill.save();

        return Response.json({ success: true, message: "Submission recorded", newDifficulty: userSkill.difficultyLevel });
    } catch (error) {
        console.error("Error processing submission:", error);
        return Response.json({ error: "Failed to process submission" }, { status: 500 });
    }
}
