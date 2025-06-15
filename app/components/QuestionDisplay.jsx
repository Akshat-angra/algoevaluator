// components/QuestionDisplay.jsx
'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function QuestionDisplay({ question }) {
    const [activeTab, setActiveTab] = useState('description');

    if (!question) {
        return <div className="p-4 text-gray-500">Question not loaded.</div>;
    }

    return (
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="border-b p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{question.title}</h2>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${question.difficulty === 'easy'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : question.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}
                    >
                        {question.difficulty}
                    </span>
                </div>

                {question.tags && question.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {question.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex border-b">
                <button
                    className={`px-4 py-2 ${activeTab === 'description' ? 'bg-blue-50 dark:bg-blue-900 border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'examples' ? 'bg-blue-50 dark:bg-blue-900 border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('examples')}
                >
                    Examples
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'constraints' ? 'bg-blue-50 dark:bg-blue-900 border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('constraints')}
                >
                    Constraints
                </button>
            </div>

            <div className="p-4 overflow-auto max-h-[400px]">
                {activeTab === 'description' && (
                    <ReactMarkdown className="prose dark:prose-invert max-w-none">
                        {question.description}
                    </ReactMarkdown>
                )}

                {activeTab === 'examples' && (
                    <div>
                        {question.testCases && question.testCases.length > 0 ? (
                            question.testCases
                                .filter(testCase => !testCase.isHidden)
                                .map((testCase, index) => (
                                    <div key={index} className="mb-4 p-3 border rounded">
                                        <h4 className="font-medium mb-2">Example {index + 1}</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm font-medium mb-1">Input:</div>
                                                <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                                                    {testCase.input}
                                                </pre>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium mb-1">Output:</div>
                                                <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                                                    {testCase.expectedOutput}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-gray-500 italic">No examples available.</div>
                        )}
                    </div>
                )}

                {activeTab === 'constraints' && (
                    <div>
                        <div className="mb-2">
                            <span className="font-medium">Time Limit:</span> {question.timeConstraint} minutes
                        </div>
                        <ReactMarkdown className="prose dark:prose-invert max-w-none">
                            {question.constraints || "No additional constraints specified."}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}