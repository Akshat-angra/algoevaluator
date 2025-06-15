'use client';

import { useState } from 'react';

export default function QuestionPanel({ question }) {
  const [activeTab, setActiveTab] = useState('description');
  
  if (!question) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Select a question to begin</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 text-white p-2">
        <h2 className="font-semibold text-xl">{question.title}</h2>
        <div className="flex space-x-1 mt-2">
          <span className={`px-2 py-1 rounded text-xs ${
            question.difficulty === 'easy' 
              ? 'bg-green-600' 
              : question.difficulty === 'medium'
                ? 'bg-yellow-600'
                : 'bg-red-600'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          <span className="px-2 py-1 rounded text-xs bg-blue-600">
            {question.category}
          </span>
        </div>
      </div>
      
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 ${activeTab === 'description' 
            ? 'border-b-2 border-blue-500 text-blue-500' 
            : 'text-gray-400'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'examples' 
            ? 'border-b-2 border-blue-500 text-blue-500' 
            : 'text-gray-400'}`}
          onClick={() => setActiveTab('examples')}
        >
          Examples
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'constraints' 
            ? 'border-b-2 border-blue-500 text-blue-500' 
            : 'text-gray-400'}`}
          onClick={() => setActiveTab('constraints')}
        >
          Constraints
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p>{question.description}</p>
          </div>
        )}
        
        {activeTab === 'examples' && (
          <div>
            {question.examples.map((example, index) => (
              <div key={index} className="mb-6 bg-gray-100 p-4 rounded dark:bg-gray-800">
                <h3 className="font-semibold mb-2">Example {index + 1}:</h3>
                <div className="mb-2">
                  <p className="font-mono bg-gray-200 p-2 rounded dark:bg-gray-700">
                    <span className="font-semibold">Input:</span> {example.input}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="font-mono bg-gray-200 p-2 rounded dark:bg-gray-700">
                    <span className="font-semibold">Output:</span> {example.output}
                  </p>
                </div>
                {example.explanation && (
                  <div>
                    <p className="font-semibold">Explanation:</p>
                    <p>{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'constraints' && (
          <div>
            <h3 className="font-semibold mb-2">Constraints:</h3>
            <ul className="list-disc pl-5">
              {question.constraints.map((constraint, index) => (
                <li key={index} className="mb-1">{constraint}</li>
              ))}
            </ul>
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Expected Complexity:</h3>
              <p>Time Complexity: <span className="font-mono">{question.expectedTimeComplexity}</span></p>
              <p>Space Complexity: <span className="font-mono">{question.expectedSpaceComplexity}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}