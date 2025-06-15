// // app/candidates/[id]/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { User, ArrowLeft, Loader2, Briefcase, Clock, Tag, Mail } from 'lucide-react';

// export default function CandidateDetailPage({ params }) {
//     const router = useRouter();
//     const { id } = params;

//     const [candidate, setCandidate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchCandidate() {
//             try {
//                 const response = await fetch(`/api/candidates/${id}`);

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch candidate details');
//                 }

//                 const data = await response.json();
//                 setCandidate(data.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchCandidate();
//     }, [id]);

//     const statusColors = {
//         applied: 'bg-blue-100 text-blue-800',
//         screening: 'bg-purple-100 text-purple-800',
//         interview: 'bg-yellow-100 text-yellow-800',
//         offer: 'bg-green-100 text-green-800',
//         rejected: 'bg-red-100 text-red-800'
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-red-100 text-red-800 p-4 rounded-lg">
//                     {error}
//                 </div>
//                 <Link href="/candidates">
//                     <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                         Back to Candidates
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     if (!candidate) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
//                     Candidate not found
//                 </div>
//                 <Link href="/candidates">
//                     <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                         Back to Candidates
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <Link href="/candidates">
//                 <div className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Candidates
//                 </div>
//             </Link>

//             <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                     <div className="flex items-center space-x-4">
//                         <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
//                             <User className="w-8 h-8 text-indigo-600" />
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
//                             <div className="flex items-center mt-1">
//                                 <Mail className="w-4 h-4 text-gray-500 mr-1" />
//                                 <span className="text-gray-500">{candidate.email}</span>
//                             </div>
//                         </div>
//                         <div className="ml-auto">
//                             <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColors[candidate.status]}`}>
//                                 {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Briefcase className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Position</h2>
//                         </div>
//                         <p className="text-gray-700">{candidate.position}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Clock className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Experience</h2>
//                         </div>
//                         <p className="text-gray-700">{candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Tag className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Skills</h2>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {candidate.skills.length > 0 ? (
//                                 candidate.skills.map((skill, index) => (
//                                     <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
//                                         {skill}
//                                     </span>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500">No skills listed</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
//                     <Link href={`/candidates/edit/${candidate._id}`}>
//                         <div className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
//                             Edit Candidate
//                         </div>
//                     </Link>
//                     <button
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//                         onClick={async () => {
//                             if (confirm('Are you sure you want to delete this candidate?')) {
//                                 try {
//                                     const response = await fetch(`/api/candidates/${id}`, {
//                                         method: 'DELETE',
//                                     });

//                                     if (!response.ok) {
//                                         throw new Error('Failed to delete candidate');
//                                     }

//                                     router.push('/candidates');
//                                 } catch (err) {
//                                     alert(`Error: ${err.message}`);
//                                 }
//                             }
//                         }}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// app/candidates/[id]/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { use } from 'react'; // Import React.use
// import Link from 'next/link';
// import { User, ArrowLeft, Loader2, Briefcase, Clock, Tag, Mail } from 'lucide-react';

// export default function CandidateDetailPage({ params }) {
//     const router = useRouter();
//     // Unwrap params with React.use()
//     const unwrappedParams = use(params);
//     const id = unwrappedParams.id;

//     const [candidate, setCandidate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchCandidate() {
//             try {
//                 const response = await fetch(`/api/candidates/${id}`);

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch candidate details');
//                 }

//                 const data = await response.json();
//                 setCandidate(data.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchCandidate();
//     }, [id]);

//     const statusColors = {
//         applied: 'bg-blue-100 text-blue-800',
//         screening: 'bg-purple-100 text-purple-800',
//         interview: 'bg-yellow-100 text-yellow-800',
//         offer: 'bg-green-100 text-green-800',
//         rejected: 'bg-red-100 text-red-800'
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-red-100 text-red-800 p-4 rounded-lg">
//                     {error}
//                 </div>
//                 <Link href="/candidates">
//                     <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                         Back to Candidates
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     if (!candidate) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
//                     Candidate not found
//                 </div>
//                 <Link href="/candidates">
//                     <div className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                         Back to Candidates
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <Link href="/candidates">
//                 <div className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Candidates
//                 </div>
//             </Link>

//             <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                     <div className="flex items-center space-x-4">
//                         <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
//                             <User className="w-8 h-8 text-indigo-600" />
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
//                             <div className="flex items-center mt-1">
//                                 <Mail className="w-4 h-4 text-gray-500 mr-1" />
//                                 <span className="text-gray-500">{candidate.email}</span>
//                             </div>
//                         </div>
//                         <div className="ml-auto">
//                             <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColors[candidate.status]}`}>
//                                 {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Briefcase className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Position</h2>
//                         </div>
//                         <p className="text-gray-700">{candidate.position}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Clock className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Experience</h2>
//                         </div>
//                         <p className="text-gray-700">{candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Tag className="w-5 h-5 text-indigo-500" />
//                             <h2 className="text-lg font-medium text-gray-900">Skills</h2>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {candidate.skills.length > 0 ? (
//                                 candidate.skills.map((skill, index) => (
//                                     <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
//                                         {skill}
//                                     </span>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500">No skills listed</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
//                     <Link href={`/candidates/edit/${candidate._id}`}>
//                         <div className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
//                             Edit Candidate
//                         </div>
//                     </Link>
//                     <button
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//                         onClick={async () => {
//                             if (confirm('Are you sure you want to delete this candidate?')) {
//                                 try {
//                                     const response = await fetch(`/api/candidates/${id}`, {
//                                         method: 'DELETE',
//                                     });

//                                     if (!response.ok) {
//                                         throw new Error('Failed to delete candidate');
//                                     }

//                                     router.push('/candidates');
//                                 } catch (err) {
//                                     alert(`Error: ${err.message}`);
//                                 }
//                             }
//                         }}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import {
    User, ArrowLeft, Loader2, Briefcase,
    Clock, Tag, Mail, ExternalLink,
    ChevronRight, Trash2, Edit
} from 'lucide-react';

export default function CandidateDetailPage({ params }) {
    const router = useRouter();
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

    const statusColors = {
        applied: 'bg-blue-500 text-white',
        screening: 'bg-purple-500 text-white',
        interview: 'bg-amber-500 text-white',
        offer: 'bg-emerald-500 text-white',
        rejected: 'bg-red-500 text-white'
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-gray-600 font-medium">Loading candidate data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-red-800">Error Loading Candidate</h3>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
                <Link href="/candidates">
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Candidates
                    </div>
                </Link>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-yellow-800">Candidate Not Found</h3>
                            <p className="text-yellow-700 mt-1">The requested candidate profile could not be found.</p>
                        </div>
                    </div>
                </div>
                <Link href="/candidates">
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Candidates
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="flex items-center justify-between mb-6">
                    <Link href="/candidates">
                        <div className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Candidates
                        </div>
                    </Link>
                    <div className="flex space-x-3">
                        <Link href={`/candidates/edit/${candidate._id}`}>
                            <div className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow flex items-center">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </div>
                        </Link>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow flex items-center"
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this candidate?')) {
                                    try {
                                        const response = await fetch(`/api/candidates/${id}`, {
                                            method: 'DELETE',
                                        });

                                        if (!response.ok) {
                                            throw new Error('Failed to delete candidate');
                                        }

                                        router.push('/candidates');
                                    } catch (err) {
                                        alert(`Error: ${err.message}`);
                                    }
                                }
                            }}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white">
                        <div className="flex items-center">
                            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold">{candidate.name}</h1>
                                <div className="flex items-center mt-2">
                                    <Mail className="w-4 h-4 mr-2 opacity-80" />
                                    <span className="opacity-90">{candidate.email}</span>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <span className={`px-4 py-2 inline-flex text-sm font-bold rounded-full shadow-md ${statusColors[candidate.status]}`}>
                                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Candidate details in cards */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Briefcase className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Position</h2>
                                </div>
                                <p className="text-gray-700 text-lg font-medium">{candidate.position}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Clock className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
                                </div>
                                <p className="text-gray-700 text-lg font-medium">
                                    {candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Tag className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.length > 0 ? (
                                        candidate.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-white text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No skills listed</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation links */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={`/candidates/${id}/interviews`}>
                                <div className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                    <span className="font-medium text-gray-700">Interview History</span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href={`/candidates/${id}/resume`}>
                                <div className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                    <span className="font-medium text-gray-700">View Resume</span>
                                    <ExternalLink className="w-5 h-5 text-gray-400" />
                                </div>
                            </Link>
                            <Link href={`/candidates/${id}/notes`}>
                                <div className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                    <span className="font-medium text-gray-700">Recruiter Notes</span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}