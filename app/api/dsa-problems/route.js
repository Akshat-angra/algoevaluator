import { getAuth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Problem from '@/models/problem.model';
import UserProgress from '@/models/userprogress.model';
import DailyChallenge from '@/models/dailychallenge.model';

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized - Please log in to access this resource" },
                { status: 401 }
            );
        }

        await connectToDB();
        const [problems, userProgress, dailyChallenge] = await Promise.all([
            Problem.find().sort({ topic: 1 }).lean(),
            UserProgress.findOne({ userId }).lean(),
            DailyChallenge.findOne().sort({ date: -1 }).lean()
        ]);

        if (!problems || problems.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No DSA problems found in the database",
                    topics: [],
                    dailyChallenge: null,
                    stats: null
                },
                { status: 404 }
            );
        }

        const topicsMap = problems.reduce((acc, problem) => {
            if (!acc[problem.topic]) {
                acc[problem.topic] = {
                    id: problem.topic.toLowerCase().replace(/\s+/g, ''),
                    name: problem.topic,
                    icon: getTopicIcon(problem.topic),
                    count: 0,
                    questions: []
                };
            }

            if (acc[problem.topic].questions.length < 6) {
                const isSolved = userProgress?.solvedProblems?.includes(problem._id.toString()) || false;

                console.log('User ID:', userId);
                console.log('User Progress:', userProgress);
                console.log('Solved Problems:', userProgress?.solvedProblems);

                acc[problem.topic].questions.push({
                    id: problem._id.toString(),
                    title: problem.title,
                    difficulty: problem.difficulty,
                    solved: isSolved,
                    likes: problem.likes || 0
                });
            }

            acc[problem.topic].count += 1;
            return acc;
        }, {});

        const stats = calculateStats(problems, userProgress);

        let formattedDailyChallenge = null;
        if (dailyChallenge) {
            const timeRemaining = calculateTimeRemaining(dailyChallenge.expiresAt);
            formattedDailyChallenge = {
                id: dailyChallenge._id.toString(),
                title: dailyChallenge.title,
                description: dailyChallenge.description,
                difficulty: dailyChallenge.difficulty,
                tags: dailyChallenge.tags,
                timeRemaining
            };
        }

        return NextResponse.json({
            success: true,
            topics: Object.values(topicsMap),
            dailyChallenge: formattedDailyChallenge,
            stats
        });

    } catch (error) {
        console.error("Error fetching DSA problems:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data from MongoDB",
                error: error.message
            },
            { status: 500 }
        );
    }
}

function getTopicIcon(topic) {
    const icons = {
        'Arrays': 'Code',
        'Linked Lists': 'ChevronRight',
        'Trees & Graphs': 'BookOpen',
        'Dynamic Programming': 'Brain',
        'Sorting & Searching': 'BarChart2',
        'Greedy Algorithms': 'Shield',
        'Backtracking': 'Terminal',
    };

    return icons[topic] || 'BookOpen';
}

function calculateTimeRemaining(expiresAt) {
    if (!expiresAt) return "0:00:00";

    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry - now;

    if (diffMs <= 0) return "0:00:00";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculateStats(problems, userProgress) {
    if (!problems || problems.length === 0) {
        return null;
    }

    const total = problems.length;
    const solved = userProgress?.solvedProblems?.length || 0;
    const attempts = userProgress?.attempts || 0;
    const streak = userProgress?.streak || 0;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = problems.filter(p => {
        return p.createdAt && new Date(p.createdAt) > oneWeekAgo;
    }).length;

    const completionRate = (solved / total * 100).toFixed(1) + '%';
    const successRate = attempts > 0 ? ((solved / attempts) * 100).toFixed(1) + '%' : '0.0%';

    const streakGrowth = userProgress?.lastWeekStreak ? streak - userProgress.lastWeekStreak : 0;

    return {
        total,
        solved,
        attempts,
        streak,
        newThisWeek,
        completionRate,
        successRate,
        streakGrowth
    };
}