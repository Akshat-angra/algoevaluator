"use client";

import { useState } from 'react';

export default function InterviewSessions({ interviews, userRole, onSelect }) {
    const [filter, setFilter] = useState('all');

    // Filter interviews based on active status
    const filteredInterviews = interviews.filter(interview => {
        if (filter === 'active') return interview.isActive;
        if (filter === 'inactive') return !interview.isActive;
        return true;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div>
            {interviews.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        {userRole === 'interviewer'
                            ? 'You haven\'t created any interviews yet.'
                            : 'No interviews are available at the moment.'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex space-x-2 mb-4">
                        <button
                            className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${filter === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${filter === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                            onClick={() => setFilter('inactive')}
                        >
                            Inactive
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredInterviews.map((interview) => (
                                    <tr key={interview._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{interview.title}</div>
                                            <div className="text-sm text-gray-500">{interview.description && interview.description.substring(0, 50)}{interview.description && interview.description.length > 50 ? '...' : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(interview.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${interview.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {interview.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {interview.questions.length}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => onSelect(interview._id)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                {userRole === 'interviewer' ? 'Manage' : 'Start'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}