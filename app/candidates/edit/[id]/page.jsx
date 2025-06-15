// app/candidates/edit/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { use } from 'react'; // Import React.use
import Link from 'next/link';
import { ArrowLeft, UserCog, Loader2 } from 'lucide-react';
import CandidateForm from '@/app/components/CandidateForm';

export default function EditCandidatePage({ params }) {
    // Unwrap params with React.use()
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCandidate() {
            try {
                const response = await fetch(`/api/candidates/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch candidate details');
                }

                const data = await response.json();
                setCandidate(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCandidate();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                    {error}
                </div>
                <Link href="/candidates">
                    <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Candidates
                    </div>
                </Link>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                    Candidate not found
                </div>
                <Link href="/candidates">
                    <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Candidates
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/candidates">
                <div className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Candidates
                </div>
            </Link>

            <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <UserCog className="w-6 h-6 text-indigo-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Edit Candidate</h1>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <CandidateForm candidate={candidate} />
            </div>
        </div>
    );
}