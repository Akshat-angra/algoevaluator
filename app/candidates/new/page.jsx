// app/candidates/new/page.jsx
'use client';

import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';
import CandidateForm from '@/app/components/CandidateForm';

export default function NewCandidatePage() {
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
                    <UserPlus className="w-6 h-6 text-indigo-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Add New Candidate</h1>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <CandidateForm />
            </div>
        </div>
    );
}