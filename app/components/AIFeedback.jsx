'use client';

const AIFeedback = ({ evaluation, loading }) => {
    if (loading) {
        return (
            <div className="p-4 border rounded bg-gray-50">
                <div className="flex justify-center items-center h-32">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                        <p className="text-gray-600">AI is analyzing your code...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!evaluation) {
        return (
            <div className="p-4 border rounded bg-gray-50">
                <p className="text-gray-500">Submit your code for AI feedback</p>
            </div>
        );
    }

    // Define rating color based on score
    const getRatingColor = (rating) => {
        if (rating >= 8) return 'text-green-600';
        if (rating >= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="p-4 border rounded bg-gray-50 overflow-auto max-h-96">
            <h3 className="text-xl font-bold mb-4">AI Evaluation</h3>

            <div className="mb-4">
                <h4 className="font-semibold">Overall Rating</h4>
                <div className="flex items-center">
                    <span className={`text-2xl font-bold ${getRatingColor(evaluation.overallRating)}`}>
                        {evaluation.overallRating}/10
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold">Correctness</h4>
                <p>{evaluation.correctness}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h4 className="font-semibold">Time Complexity</h4>
                    <p>{evaluation.timeComplexity}</p>
                </div>

                <div>
                    <h4 className="font-semibold">Space Complexity</h4>
                    <p>{evaluation.spaceComplexity}</p>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold">Code Quality</h4>
                <p>{evaluation.codeQuality}</p>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold">Optimization Tips</h4>
                <ul className="list-disc pl-5">
                    {evaluation.optimizationTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-semibold">Feedback</h4>
                <p>{evaluation.feedback}</p>
            </div>
        </div>
    );
};

export default AIFeedback;