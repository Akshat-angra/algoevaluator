// /app/components/QuestionPrompt.jsx
'use client';

import { useState } from 'react';

export default function QuestionPrompt({ question }) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!question) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">No question data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg shadow-sm">
            <div
                className="p-4 font-medium text-lg flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3>{question.prompt?.split('\n')[0] || 'Code Problem'}</h3>
                <button>
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>

            {isExpanded && (
                <div className="p-4 pt-0 border-t">
                    <div className="mb-4 whitespace-pre-wrap">
                        {question.prompt}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-semibold">Difficulty:</span>{' '}
                            <span className={
                                question.difficulty === 'hard' ? 'text-red-600' :
                                    question.difficulty === 'medium' ? 'text-yellow-600' :
                                        'text-green-600'
                            }>
                                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-semibold">Time Limit:</span>{' '}
                            {question.timeLimit} minutes
                        </div>

                        {question.expectedComplexity?.time && (
                            <div className="bg-gray-50 p-3 rounded">
                                <span className="font-semibold">Expected Time Complexity:</span>{' '}
                                {question.expectedComplexity.time}
                            </div>
                        )}

                        {question.expectedComplexity?.space && (
                            <div className="bg-gray-50 p-3 rounded">
                                <span className="font-semibold">Expected Space Complexity:</span>{' '}
                                {question.expectedComplexity.space}
                            </div>
                        )}
                    </div>

                    {question.tags && question.tags.length > 0 && (
                        <div className="mt-4">
                            <span className="font-semibold">Tags:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {question.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}