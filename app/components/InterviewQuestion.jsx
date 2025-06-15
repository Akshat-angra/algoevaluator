'use client';

const InterviewQuestion = ({ question }) => {
    if (!question) {
        return (
            <div className="p-4 border rounded bg-gray-50">
                <p className="text-gray-500">No question available</p>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded bg-white">
            <h3 className="text-xl font-bold mb-2">{question.title}</h3>

            <div className="mb-4">
                <span className={`inline-block px-2 py-1 text-xs rounded ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
            </div>

            <div className="prose max-w-none mb-4">
                <div className="whitespace-pre-wrap">{question.description}</div>
            </div>

            {question.constraints && question.constraints.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold">Constraints:</h4>
                    <ul className="list-disc pl-5">
                        {question.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </div>
            )}

            {question.testCases && question.testCases.length > 0 && (
                <div>
                    <h4 className="font-semibold">Example Test Cases:</h4>
                    <div className="space-y-2 mt-2">
                        {question.testCases.map((testCase, index) => (
                            <div key={index} className="border rounded p-2 bg-gray-50">
                                <div><strong>Input:</strong> <code>{testCase.input}</code></div>
                                <div><strong>Output:</strong> <code>{testCase.output}</code></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewQuestion;