// // app/candidates/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Users, Loader2, Search, PlusCircle } from 'lucide-react';

// export default function CandidatesPage() {
//     const [candidates, setCandidates] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         async function fetchCandidates() {
//             try {
//                 const response = await fetch('/api/candidates');

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch candidates');
//                 }

//                 const data = await response.json();
//                 setCandidates(data.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchCandidates();
//     }, []);

//     const filteredCandidates = candidates.filter(candidate =>
//         candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const statusColors = {
//         applied: 'bg-blue-100 text-blue-800',
//         screening: 'bg-purple-100 text-purple-800',
//         interview: 'bg-yellow-100 text-yellow-800',
//         offer: 'bg-green-100 text-green-800',
//         rejected: 'bg-red-100 text-red-800'
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center space-x-3">
//                     <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
//                         <Users className="w-6 h-6 text-indigo-500" />
//                     </div>
//                     <h1 className="text-2xl font-bold text-slate-800">Candidates</h1>
//                 </div>

//                 <Link href="/candidates/new">
//                     <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
//                         <PlusCircle className="w-5 h-5" />
//                         <span>Add Candidate</span>
//                     </div>
//                 </Link>
//             </div>

//             <div className="mb-6 relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <Search className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                     type="text"
//                     className="pl-10 p-2.5 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Search candidates by name or position..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-60">
//                     <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
//                 </div>
//             ) : error ? (
//                 <div className="bg-red-100 text-red-800 p-4 rounded-lg">
//                     {error}
//                 </div>
//             ) : (
//                 <div className="bg-white shadow rounded-lg overflow-hidden">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {filteredCandidates.length > 0 ? (
//                                 filteredCandidates.map((candidate) => (
//                                     <tr key={candidate._id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
//                                             <div className="text-sm text-gray-500">{candidate.email}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {candidate.position}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[candidate.status]}`}>
//                                                 {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <Link href={`/candidates/${candidate._id}`}>
//                                                 <span className="text-indigo-600 hover:text-indigo-900 mr-4">View</span>
//                                             </Link>
//                                             <Link href={`/candidates/edit/${candidate._id}`}>
//                                                 <span className="text-indigo-600 hover:text-indigo-900">Edit</span>
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
//                                         No candidates found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }


// app/candidates/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Loader2, Search, PlusCircle } from 'lucide-react';

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Mark component as mounted to prevent hydration issues
        setMounted(true);

        async function fetchCandidates() {
            try {
                const response = await fetch('/api/candidates');

                if (!response.ok) {
                    throw new Error('Failed to fetch candidates');
                }

                const data = await response.json();
                setCandidates(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCandidates();
    }, []);

    // Only filter candidates when component is mounted to avoid hydration issues
    const filteredCandidates = mounted ? candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const statusColors = {
        applied: 'bg-blue-900 text-blue-200',
        screening: 'bg-purple-900 text-purple-200',
        interview: 'bg-amber-900 text-amber-200',
        offer: 'bg-emerald-900 text-emerald-200',
        rejected: 'bg-red-900 text-red-200'
    };

    // Don't render anything until component is mounted to avoid hydration issues
    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* AlgoStub Branding Header */}
            <div className="bg-black py-4 px-6 border-b border-gray-800">
                <div className="container mx-auto flex items-center">
                    <div className="mr-2">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 5h16M4 12h16M4 19h16" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="9" cy="12" r="3" fill="#6366F1" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        <span className="text-indigo-400">Algo</span>
                        <span>Stub</span>
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Candidates</h1>
                    </div>

                    <Link href="/candidates/new">
                        <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg shadow-indigo-500/20">
                            <PlusCircle className="w-5 h-5" />
                            <span>Add Candidate</span>
                        </div>
                    </Link>
                </div>

                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="pl-12 p-3 block w-full rounded-xl bg-gray-800 border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                        placeholder="Search candidates by name or position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="bg-red-900/30 text-red-200 p-4 rounded-xl border border-red-800">
                        {error}
                    </div>
                ) : (
                    <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-700">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Experience</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredCandidates.length > 0 ? (
                                    filteredCandidates.map((candidate) => (
                                        <tr key={candidate._id} className="hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">{candidate.name}</div>
                                                <div className="text-sm text-gray-400">{candidate.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {candidate.position}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[candidate.status]}`}>
                                                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link href={`/candidates/${candidate._id}`}>
                                                    <span className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors">View</span>
                                                </Link>
                                                <Link href={`/candidates/edit/${candidate._id}`}>
                                                    <span className="text-indigo-400 hover:text-indigo-300 transition-colors">Edit</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 whitespace-nowrap text-sm text-gray-400 text-center">
                                            No candidates found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}