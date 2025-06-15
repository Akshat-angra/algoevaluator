// "use client";
// import React, { useState, useMemo, useEffect } from 'react';
// import { Search, Building2, Clock, BarChart2, Filter, Tag, ChevronDown, Zap, Trophy, Target, ExternalLink, Code2, Brain, Blocks, Sparkles } from 'lucide-react';
// import { FooterSection } from '../components/footer/FooterSection';
// import { motion } from 'framer-motion';

// import { Amaranth, Quicksand } from "next/font/google";

// const amaranth = Amaranth({
//     subsets: ["latin"],
//     weight: ["400", "700"],
// });

// const quick = Quicksand({
//     subsets: ['latin'],
//     weight: ['500', '700']
// });


// const CODING_QUESTIONS = [
//     {
//         id: '1',
//         title: 'Two Sum',
//         company: 'Google',
//         difficulty: 'Easy',
//         category: 'Arrays',
//         timesSeen: 145,
//         lastSeen: '2024-03-15',
//         description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
//         sampleInput: 'nums = [2,7,11,15], target = 9',
//         sampleOutput: '[0,1]',
//         constraints: 'Only one valid answer exists.',
//         platforms: [
//             { name: 'LeetCode', url: 'https://leetcode.com/problems/two-sum' },
//             { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/two-sum/1' },
//             { name: 'HackerRank', url: 'https://www.hackerrank.com/challenges/two-sum' }
//         ]
//     },
//     {
//         id: '2',
//         title: 'LRU Cache',
//         company: 'Meta',
//         difficulty: 'Hard',
//         category: 'Design',
//         timesSeen: 89,
//         lastSeen: '2024-03-14',
//         description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
//         sampleInput: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]',
//         sampleOutput: '[null, null, null, 1, null, -1, null, 3, 4, 4]',
//         constraints: 'Capacity is positive integer',
//         platforms: [
//             { name: 'LeetCode', url: 'https://leetcode.com/problems/lru-cache' },
//             { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/lru-cache/1' }
//         ]
//     },
//     {
//         id: '3',
//         title: 'Merge Intervals',
//         company: 'Amazon',
//         difficulty: 'Medium',
//         category: 'Arrays',
//         timesSeen: 112,
//         lastSeen: '2024-03-13',
//         description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
//         sampleInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
//         sampleOutput: '[[1,6],[8,10],[15,18]]',
//         constraints: 'intervals[i][0] <= intervals[i][1]',
//         platforms: [
//             { name: 'LeetCode', url: 'https://leetcode.com/problems/merge-intervals' },
//             { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/merge-intervals/1' },
//             { name: 'HackerRank', url: 'https://www.hackerrank.com/challenges/merge-intervals' }
//         ]
//     }
// ];

// const COMPANIES = ['All', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'];
// const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
// const CATEGORIES = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Design'];

// const getPlatformIcon = (platform) => {
//     switch (platform.toLowerCase()) {
//         case 'leetcode':
//             return <Code2 className="w-4 h-4" />;
//         case 'geeksforgeeks':
//             return <Brain className="w-4 h-4" />;
//         case 'hackerrank':
//             return <Blocks className="w-4 h-4" />;
//         default:
//             return <ExternalLink className="w-4 h-4" />;
//     }
// };

// function PracticeSection() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCompany, setSelectedCompany] = useState('All');
//     const [selectedDifficulty, setSelectedDifficulty] = useState('All');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [sortBy, setSortBy] = useState('timesSeen');
//     const [sortOrder, setSortOrder] = useState('desc');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsLoading(false);
//         }, 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     const filteredQuestions = useMemo(() => {
//         return CODING_QUESTIONS.filter(question => {
//             const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 question.description.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesCompany = selectedCompany === 'All' || question.company === selectedCompany;
//             const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
//             const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory;

//             return matchesSearch && matchesCompany && matchesDifficulty && matchesCategory;
//         }).sort((a, b) => {
//             const order = sortOrder === 'asc' ? 1 : -1;
//             if (sortBy === 'timesSeen') {
//                 return (a.timesSeen - b.timesSeen) * order;
//             }
//             return (new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime()) * order;
//         });
//     }, [searchQuery, selectedCompany, selectedDifficulty, selectedCategory, sortBy, sortOrder]);

//     const getDifficultyColor = (difficulty) => {
//         switch (difficulty) {
//             case 'Easy':
//                 return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
//             case 'Medium':
//                 return 'text-amber-400 bg-amber-400/10 border border-amber-400/20';
//             case 'Hard':
//                 return 'text-rose-400 bg-rose-400/10 border border-rose-400/20';
//             default:
//                 return 'text-gray-400 bg-gray-400/10 border border-gray-400/20';
//         }
//     };

//     const getDifficultyIcon = (difficulty) => {
//         switch (difficulty) {
//             case 'Easy':
//                 return <Zap className="w-4 h-4" />;
//             case 'Medium':
//                 return <Target className="w-4 h-4" />;
//             case 'Hard':
//                 return <Trophy className="w-4 h-4" />;
//             default:
//                 return null;
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#0a0a0a] text-white">
//             <div className="relative overflow-hidden bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-b border-white/10">
//                 <div className="absolute bg-grid-white/[0.02] bg-[size:60px_60px]" />
//                 <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
//                 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//                     <div className="text-center">
//                         <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ${quick.className}`}>
//                             Practice Arena
//                         </h1>
//                         <p className={`text-2xl text-gray-300 max-w-2xl mx-auto ${amaranth.className}`}>
//                             Master your coding skills with our curated collection of interview questions from top tech companies.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <div className="relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                                 type="text"
//                                 placeholder="Search questions..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-white placeholder-gray-400"
//                             />
//                         </div>

//                         {[
//                             { value: selectedCompany, setter: setSelectedCompany, options: COMPANIES, icon: <Building2 className="w-5 h-5" />, label: 'Company' },
//                             { value: selectedDifficulty, setter: setSelectedDifficulty, options: DIFFICULTIES, icon: <Sparkles className="w-5 h-5" />, label: 'Difficulty' },
//                             { value: selectedCategory, setter: setSelectedCategory, options: CATEGORIES, icon: <Tag className="w-5 h-5" />, label: 'Topic' }
//                         ].map((select, index) => (
//                             <div key={index} className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                                     {select.icon}
//                                 </div>
//                                 <select
//                                     value={select.value}
//                                     onChange={(e) => select.setter(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-white appearance-none cursor-pointer"
//                                 >
//                                     {select.options.map(option => (
//                                         <option key={option} value={option} className="bg-[#1a1a1a]">
//                                             {option === 'All' ? `All ${select.label}s` : option}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                             </div>
//                         ))}
//                     </div>
//                 </div>


//                 {/* <div className="absolute inset-0 opacity-50 z-10">
//                     {[
//                         { name: "React", x: "10%", y: "20%", delay: 0 },
//                         { name: "Node.js", x: "80%", y: "15%", delay: 0.5 },
//                         { name: "Python", x: "20%", y: "70%", delay: 1 },
//                         { name: "TypeScript", x: "70%", y: "60%", delay: 1.5 },
//                         { name: "Java", x: "40%", y: "85%", delay: 2 },
//                     ].map((tech, index) => (
//                         <motion.div
//                             key={index}
//                             className={`absolute text-xs font-mono bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20 ${quick.className}`}
//                             style={{ left: tech.x, top: tech.y }}
//                             initial={{ opacity: 0 }}
//                             animate={{
//                                 opacity: 0.8,
//                                 y: [0, -10, 0],
//                                 transition: {
//                                     opacity: { duration: 1, delay: tech.delay },
//                                     y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: tech.delay },
//                                 },
//                             }}
//                         >
//                             {tech.name}
//                         </motion.div>
//                     ))}
//                 </div> */}

//                 {/* Sort Controls */}
//                 <div className="flex justify-end mb-6 space-x-4">
//                     <button
//                         onClick={() => {
//                             setSortBy('timesSeen');
//                             setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                         }}
//                         className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
//                             ${sortBy === 'timesSeen' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
//                     >
//                         <BarChart2 className="w-4 h-4" />
//                         <span>Frequency</span>
//                         <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
//                     </button>
//                     <button
//                         onClick={() => {
//                             setSortBy('lastSeen');
//                             setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                         }}
//                         className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
//                             ${sortBy === 'lastSeen' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
//                     >
//                         <Clock className="w-4 h-4" />
//                         <span>Date</span>
//                         <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
//                     </button>
//                 </div>

//                 {/* Questions Grid */}
//                 <div className="grid grid-cols-1 gap-6">
//                     {filteredQuestions.map(question => (
//                         <div
//                             key={question.id}
//                             className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.07]"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/3 group-hover:via-blue-500/5 group-hover:to-purple-500/3 transition-all duration-500" />

//                             <div className="relative p-6">
//                                 <div className="flex items-start justify-between mb-6">
//                                     <div>
//                                         <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 mb-3">
//                                             {question.title}
//                                         </h3>
//                                         <div className="flex flex-wrap items-center gap-3">
//                                             <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">
//                                                 <Building2 className="w-4 h-4" />
//                                                 <span>{question.company}</span>
//                                             </div>
//                                             <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${getDifficultyColor(question.difficulty)}`}>
//                                                 {getDifficultyIcon(question.difficulty)}
//                                                 <span>{question.difficulty}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">
//                                                 <Tag className="w-4 h-4" />
//                                                 <span>{question.category}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col gap-2">
//                                         <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
//                                             Seen {question.timesSeen} times
//                                         </div>
//                                         <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
//                                             Last: {new Date(question.lastSeen).toLocaleDateString()}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <p className="text-gray-300 mb-6 leading-relaxed">
//                                     {question.description}
//                                 </p>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                     {question.sampleInput && (
//                                         <div className="bg-black/30 rounded-xl p-4 border border-white/5">
//                                             <div className="font-medium text-gray-300 mb-2">Sample Input:</div>
//                                             <code className="text-sm text-blue-400 font-mono">{question.sampleInput}</code>
//                                         </div>
//                                     )}
//                                     {question.sampleOutput && (
//                                         <div className="bg-black/30 rounded-xl p-4 border border-white/5">
//                                             <div className="font-medium text-gray-300 mb-2">Sample Output:</div>
//                                             <code className="text-sm text-purple-400 font-mono">{question.sampleOutput}</code>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {question.constraints && (
//                                     <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6">
//                                         <div className="text-sm text-gray-300">
//                                             <strong className="text-white">Constraints:</strong> {question.constraints}
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div className="flex flex-wrap gap-2">
//                                     {question.platforms.map((platform, index) => (
//                                         <a
//                                             key={index}
//                                             href={platform.url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 
//                                             text-gray-300 rounded-xl border border-white/10 transition-all duration-200"
//                                         >
//                                             {getPlatformIcon(platform.name)}
//                                             <span>{platform.name}</span>
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex items-center my-8 w-full">
//                 <div className="flex-grow h-px bg-gradient-to-r from-cyan-300 via-indigo-500 to-purple-600"></div>
//                 <div className="flex-shrink-0 mx-4">
//                     <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse"></div>
//                 </div>
//                 <div className="flex-grow h-px bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-300"></div>
//             </div>
//             <FooterSection />
//         </div>
//     );
// }

// export default PracticeSection;



// 'use client';
// import { useState, useEffect } from 'react';
// import { Search, Code, Brain, Award, ChevronRight, ChevronDown, BookOpen, BarChart2, Clock, CheckCircle, ArrowUpRight, Loader2, Terminal, Shield, Database, AlertTriangle } from 'lucide-react';

// export default function AlgostubDSAPractice() {
//     const [activeTab, setActiveTab] = useState('all');
//     const [expandedTopic, setExpandedTopic] = useState('arrays');
//     const [loading, setLoading] = useState(true);
//     const [topics, setTopics] = useState([]);
//     const [dailyChallenge, setDailyChallenge] = useState(null);
//     const [stats, setStats] = useState(null);
//     const [dataError, setDataError] = useState(false);

//     // Simulating user data from Clerk
//     const user = {
//         name: "Alex Smith",
//         initials: "AS",
//         image: null // No image, will use initials
//     };

//     const toggleTopic = (topic) => {
//         setExpandedTopic(expandedTopic === topic ? null : topic);
//     };

//     // Simulating MongoDB data fetch
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // In a real app, this would be an actual API call to MongoDB
//                 setTimeout(() => {
//                     // Simulated data
//                     if (Math.random() > 0.2) { // 80% chance to get data
//                         setTopics([
//                             {
//                                 id: 'arrays',
//                                 name: 'Arrays',
//                                 icon: <Code className="text-teal-400" size={20} />,
//                                 count: 24,
//                                 questions: [
//                                     { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true, likes: 546 },
//                                     { id: 2, title: 'Container With Most Water', difficulty: 'Medium', solved: false, likes: 423 },
//                                     { id: 3, title: 'Trapping Rain Water', difficulty: 'Hard', solved: false, likes: 389 }
//                                 ]
//                             },
//                             {
//                                 id: 'linkedlists',
//                                 name: 'Linked Lists',
//                                 icon: <ChevronRight className="text-green-400" size={20} />,
//                                 count: 18,
//                                 questions: [
//                                     { id: 4, title: 'Reverse Linked List', difficulty: 'Easy', solved: true, likes: 478 },
//                                     { id: 5, title: 'Merge Two Sorted Lists', difficulty: 'Easy', solved: false, likes: 312 },
//                                     { id: 6, title: 'LRU Cache Implementation', difficulty: 'Medium', solved: false, likes: 296 }
//                                 ]
//                             },
//                             {
//                                 id: 'trees',
//                                 name: 'Trees & Graphs',
//                                 icon: <BookOpen className="text-blue-400" size={20} />,
//                                 count: 32,
//                                 questions: [
//                                     { id: 7, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', solved: false, likes: 412 },
//                                     { id: 8, title: 'Validate Binary Search Tree', difficulty: 'Medium', solved: false, likes: 354 },
//                                     { id: 9, title: 'Word Ladder', difficulty: 'Hard', solved: false, likes: 278 }
//                                 ]
//                             },
//                             {
//                                 id: 'dp',
//                                 name: 'Dynamic Programming',
//                                 icon: <Brain className="text-purple-400" size={20} />,
//                                 count: 27,
//                                 questions: [
//                                     { id: 10, title: 'Fibonacci Number', difficulty: 'Easy', solved: true, likes: 298 },
//                                     { id: 11, title: 'Coin Change', difficulty: 'Medium', solved: false, likes: 367 },
//                                     { id: 12, title: 'Edit Distance', difficulty: 'Hard', solved: false, likes: 312 }
//                                 ]
//                             },
//                             {
//                                 id: 'sorting',
//                                 name: 'Sorting & Searching',
//                                 icon: <BarChart2 className="text-yellow-400" size={20} />,
//                                 count: 22,
//                                 questions: [
//                                     { id: 13, title: 'Binary Search', difficulty: 'Easy', solved: true, likes: 286 },
//                                     { id: 14, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', solved: false, likes: 332 },
//                                     { id: 15, title: 'Merge k Sorted Lists', difficulty: 'Hard', solved: false, likes: 287 }
//                                 ]
//                             },
//                             {
//                                 id: 'greedy',
//                                 name: 'Greedy Algorithms',
//                                 icon: <Shield className="text-red-400" size={20} />,
//                                 count: 15,
//                                 questions: [
//                                     { id: 16, title: 'Jump Game', difficulty: 'Medium', solved: false, likes: 276 },
//                                     { id: 17, title: 'Task Scheduler', difficulty: 'Medium', solved: false, likes: 312 },
//                                     { id: 18, title: 'Gas Station', difficulty: 'Medium', solved: false, likes: 241 }
//                                 ]
//                             },
//                             {
//                                 id: 'backtracking',
//                                 name: 'Backtracking',
//                                 icon: <Terminal className="text-orange-400" size={20} />,
//                                 count: 19,
//                                 questions: [
//                                     { id: 19, title: 'N-Queens', difficulty: 'Hard', solved: false, likes: 302 },
//                                     { id: 20, title: 'Combination Sum', difficulty: 'Medium', solved: true, likes: 354 },
//                                     { id: 21, title: 'Word Search', difficulty: 'Medium', solved: false, likes: 287 }
//                                 ]
//                             }
//                         ]);

//                         setDailyChallenge({
//                             title: 'Maximum Subarray Sum',
//                             description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
//                             difficulty: 'Medium',
//                             tags: ['Arrays', 'Dynamic Programming'],
//                             timeRemaining: '7:42:18'
//                         });

//                         setStats({
//                             total: 125,
//                             solved: 42,
//                             attempts: 87,
//                             streak: 6,
//                             newThisWeek: 7,
//                             completionRate: '33.6%',
//                             successRate: '48.3%',
//                             streakGrowth: 2
//                         });

//                         setDataError(false);
//                     } else {
//                         // Simulate no data scenario
//                         setTopics([]);
//                         setDailyChallenge(null);
//                         setStats(null);
//                         setDataError(true);
//                     }
//                     setLoading(false);
//                 }, 1500);
//             } catch (error) {
//                 setDataError(true);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const getDifficultyColor = (difficulty) => {
//         switch (difficulty) {
//             case 'Easy': return 'bg-green-900/30 text-green-400 border border-green-700/50';
//             case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50';
//             case 'Hard': return 'bg-red-900/30 text-red-400 border border-red-700/50';
//             default: return 'bg-gray-900 text-gray-400 border border-gray-700/50';
//         }
//     };

//     // Empty state display
//     const renderEmptyState = () => (
//         <div className="flex flex-col items-center justify-center py-16 text-center">
//             <Database className="text-gray-600 mb-4" size={48} />
//             <h3 className="text-xl font-bold text-gray-400 mb-2">No data available</h3>
//             <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 We couldn't fetch your DSA problems from the database. This might be due to connection issues or no problems have been added yet.
//             </p>
//             <button className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-teal-100 rounded-lg font-medium flex items-center space-x-2 group transition-all duration-300">
//                 <span>Try again</span>
//                 <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//             </button>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
//             {/* Animated gradient background */}
//             <div className="absolute inset-0 bg-black z-0 overflow-hidden">
//                 <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-teal-900/20 rounded-full blur-3xl animate-blob1"></div>
//                 <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-900/20 rounded-full blur-3xl animate-blob2"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-3xl animate-blob3"></div>
//             </div>

//             {/* Content with glass effect */}
//             <div className="relative z-10">
//                 {/* Header */}
//                 <header className="backdrop-blur-xl bg-black/70 py-4 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-20">
//                     <div className="flex items-center space-x-2">
//                         <div className="bg-gradient-to-br from-teal-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
//                             <Code size={24} className="text-black" />
//                         </div>
//                         <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">AlgoStub</h1>
//                     </div>
//                     <div className="relative w-1/3">
//                         <input
//                             type="text"
//                             placeholder="Search problems..."
//                             className="w-full bg-gray-900/80 border border-gray-800 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
//                         />
//                         <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <div className="bg-gray-900 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
//                             <Award className="text-yellow-400" size={20} />
//                         </div>
//                         {/* Clerk user icon with initials */}
//                         <div className="bg-gradient-to-br from-teal-500 to-indigo-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
//                             <span className="font-medium text-black">{user.initials}</span>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Main Content */}
//                 <div className="max-w-6xl mx-auto pt-8 px-4 pb-16">
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-3xl font-bold">DSA Practice</h2>
//                         <div className="flex space-x-2">
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'all' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('all')}>All Problems</button>
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'my' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('my')}>My List</button>
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'completed' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('completed')}>Completed</button>
//                         </div>
//                     </div>

//                     {loading ? (
//                         // Loading state
//                         <div className="flex flex-col items-center justify-center py-20">
//                             <Loader2 size={48} className="text-teal-500 animate-spin mb-4" />
//                             <p className="text-gray-400">Loading data from MongoDB...</p>
//                         </div>
//                     ) : dataError ? (
//                         renderEmptyState()
//                     ) : (
//                         <>
//                             {/* Stats */}
//                             {stats && (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-teal-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Total Problems</p>
//                                                 <p className="text-2xl font-bold group-hover:text-teal-400 transition-colors">{stats.total}</p>
//                                             </div>
//                                             <div className="bg-teal-900/30 p-2 rounded-lg group-hover:bg-teal-900/50 transition-colors">
//                                                 <BookOpen className="text-teal-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-teal-400">+{stats.newThisWeek}</span> new this week
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-green-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Solved</p>
//                                                 <p className="text-2xl font-bold group-hover:text-green-400 transition-colors">{stats.solved}</p>
//                                             </div>
//                                             <div className="bg-green-900/30 p-2 rounded-lg group-hover:bg-green-900/50 transition-colors">
//                                                 <CheckCircle className="text-green-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">{stats.completionRate}</span> completion rate
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-yellow-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Attempts</p>
//                                                 <p className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{stats.attempts}</p>
//                                             </div>
//                                             <div className="bg-yellow-900/30 p-2 rounded-lg group-hover:bg-yellow-900/50 transition-colors">
//                                                 <Clock className="text-yellow-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">{stats.successRate}</span> success rate
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-purple-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Current Streak</p>
//                                                 <p className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{stats.streak} days</p>
//                                             </div>
//                                             <div className="bg-purple-900/30 p-2 rounded-lg group-hover:bg-purple-900/50 transition-colors">
//                                                 <Award className="text-purple-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">+{stats.streakGrowth}</span> from last week
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Topic List */}
//                             {topics.length > 0 ? (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden mb-8">
//                                     <div className="p-4 border-b border-gray-800">
//                                         <h3 className="text-xl font-bold">Topics</h3>
//                                     </div>
//                                     <div>
//                                         {topics.map((topic) => (
//                                             <div key={topic.id} className="border-b border-gray-800 last:border-b-0">
//                                                 <div
//                                                     className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/60 transition-colors"
//                                                     onClick={() => toggleTopic(topic.id)}
//                                                 >
//                                                     <div className="flex items-center space-x-3">
//                                                         {topic.icon}
//                                                         <span className="font-medium">{topic.name}</span>
//                                                         <span className="text-sm text-gray-400">{topic.count} problems</span>
//                                                     </div>
//                                                     <div className="transform transition-transform duration-300">
//                                                         {expandedTopic === topic.id ?
//                                                             <ChevronDown size={20} className="text-gray-400" /> :
//                                                             <ChevronRight size={20} className="text-gray-400" />
//                                                         }
//                                                     </div>
//                                                 </div>

//                                                 {expandedTopic === topic.id && (
//                                                     <div className="bg-black/40 pb-2 animate-fadeIn">
//                                                         {topic.questions.map((question) => (
//                                                             <div key={question.id} className="flex items-center justify-between p-3 mx-2 my-1 rounded-lg hover:bg-gray-800/80 group cursor-pointer transition-all duration-300">
//                                                                 <div className="flex items-center space-x-3">
//                                                                     {question.solved ?
//                                                                         <CheckCircle size={18} className="text-green-400" /> :
//                                                                         <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-teal-500 transition-colors" />
//                                                                     }
//                                                                     <span className="group-hover:text-teal-400 transition-colors">{question.title}</span>
//                                                                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
//                                                                         {question.difficulty}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex items-center space-x-4">
//                                                                     <div className="text-sm text-gray-400 flex items-center space-x-1">
//                                                                         <Award size={16} />
//                                                                         <span>{question.likes}</span>
//                                                                     </div>
//                                                                     <ArrowUpRight size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                         <div className="text-center py-2">
//                                                             <button className="text-teal-400 text-sm hover:text-teal-300 group flex items-center justify-center mx-auto space-x-1">
//                                                                 <span>View all {topic.count} problems</span>
//                                                                 <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-8 text-center">
//                                     <AlertTriangle className="text-yellow-500 mx-auto mb-4" size={40} />
//                                     <h3 className="text-xl font-bold mb-2">No Topics Available</h3>
//                                     <p className="text-gray-400 max-w-md mx-auto mb-6">
//                                         Couldn't find any DSA topics in our database. Try refreshing or check back later.
//                                     </p>
//                                 </div>
//                             )}

//                             {/* Daily Challenge */}
//                             {dailyChallenge ? (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden">
//                                     <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//                                         <h3 className="text-xl font-bold flex items-center">
//                                             <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></div>
//                                             Daily Challenge
//                                         </h3>
//                                         <span className="text-sm text-gray-400">Refreshes in {dailyChallenge.timeRemaining}</span>
//                                     </div>
//                                     <div className="p-6">
//                                         <h4 className="text-lg font-bold mb-2 text-teal-400">{dailyChallenge.title}</h4>
//                                         <p className="text-gray-300 mb-4">
//                                             {dailyChallenge.description}
//                                         </p>
//                                         <div className="flex space-x-2 mb-4">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(dailyChallenge.difficulty)}`}>
//                                                 {dailyChallenge.difficulty}
//                                             </span>
//                                             {dailyChallenge.tags.map((tag, index) => (
//                                                 <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 border border-gray-700 text-gray-300">
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-teal-900/20 hover:shadow-teal-900/40">
//                                             Solve Challenge
//                                         </button>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-8 text-center">
//                                     <Clock className="text-gray-500 mx-auto mb-4" size={40} />
//                                     <h3 className="text-xl font-bold mb-2">No Daily Challenge Available</h3>
//                                     <p className="text-gray-400 max-w-md mx-auto mb-6">
//                                         We couldn't load today's challenge. Check your connection or try again later.
//                                     </p>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* CSS animations */}
//             <style jsx>{`
//         @keyframes blob1 {
//           0% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         @keyframes blob2 {
//           0% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(-30px, 50px) scale(1.1); }
//           66% { transform: translate(20px, -20px) scale(0.9); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         @keyframes blob3 {
//           0% { transform: translate(-50%, -50%) scale(1); }
//           33% { transform: translate(-50%, -50%) scale(1.2); }
//           66% { transform: translate(-50%, -50%) scale(0.8); }
//           100% { transform: translate(-50%, -50%) scale(1); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-blob1 {
//           animation: blob1 15s infinite ease-in-out;
//         }
//         .animate-blob2 {
//           animation: blob2 15s infinite ease-in-out;
//         }
//         .animate-blob3 {
//           animation: blob3 15s infinite ease-in-out;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//         </div>
//     );
// }

// 'use client';
// import { useState, useEffect } from 'react';
// import {
//     Search, Code, Brain, Award, ChevronRight, ChevronDown, BookOpen, BarChart2,
//     Clock, CheckCircle, ArrowUpRight, Loader2, Terminal, Shield, Database, AlertTriangle
// } from 'lucide-react';
// import { FooterSection } from '../components/footer/FooterSection';
// import Link from 'next/link';
// import { UserButton } from "@clerk/clerk-react";

// export default function AlgostubDSAPractice() {
//     const [activeTab, setActiveTab] = useState('all');
//     const [expandedTopic, setExpandedTopic] = useState('arrays');
//     const [loading, setLoading] = useState(true);
//     const [topics, setTopics] = useState([]);
//     const [dailyChallenge, setDailyChallenge] = useState(null);
//     const [stats, setStats] = useState(null);
//     const [dataError, setDataError] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const toggleTopic = (topic) => {
//         setExpandedTopic(expandedTopic === topic ? null : topic);
//     };

//     // Fetch data from MongoDB through API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch('/api/dsa-problems');
//                 const data = await response.json();

//                 if (!response.ok) {
//                     throw new Error(data.message || 'Failed to fetch data');
//                 }

//                 if (data.success) {
//                     setTopics(data.topics || []);
//                     setDailyChallenge(data.dailyChallenge);
//                     setStats(data.stats);
//                     setDataError(false);
//                 } else {
//                     setDataError(true);
//                     setErrorMessage(data.message || 'No data available');
//                     setTopics([]);
//                     setDailyChallenge(null);
//                     setStats(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching DSA problems:", error);
//                 setDataError(true);
//                 setErrorMessage(error.message || 'Failed to connect to database');
//                 setTopics([]);
//                 setDailyChallenge(null);
//                 setStats(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const getDifficultyColor = (difficulty) => {
//         switch (difficulty) {
//             case 'Easy': return 'bg-green-900/30 text-green-400 border border-green-700/50';
//             case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50';
//             case 'Hard': return 'bg-red-900/30 text-red-400 border border-red-700/50';
//             default: return 'bg-gray-900 text-gray-400 border border-gray-700/50';
//         }
//     };

//     const getIconComponent = (iconName) => {
//         const iconMap = {
//             'Code': <Code className="text-teal-400" size={20} />,
//             'ChevronRight': <ChevronRight className="text-green-400" size={20} />,
//             'BookOpen': <BookOpen className="text-blue-400" size={20} />,
//             'Brain': <Brain className="text-purple-400" size={20} />,
//             'BarChart2': <BarChart2 className="text-yellow-400" size={20} />,
//             'Shield': <Shield className="text-red-400" size={20} />,
//             'Terminal': <Terminal className="text-orange-400" size={20} />
//         };

//         return iconMap[iconName] || <BookOpen className="text-gray-400" size={20} />;
//     };

//     // Empty state display with custom message
//     const renderEmptyState = () => (
//         <div className="flex flex-col items-center justify-center py-16 text-center border-teal-500 border-2 rounded-xl">
//             <Database className="text-gray-600 mb-4" size={48} />
//             <h3 className="text-xl font-bold text-gray-400 mb-2">
//                 {errorMessage || "No data available"}
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 {dataError ?
//                     "We couldn't fetch your DSA problems from MongoDB. This might be due to connection issues or no problems have been added yet." :
//                     "There are no problems in the database. Try adding some problems first."}
//             </p>
//             <button
//                 className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-teal-100 rounded-lg font-medium flex items-center space-x-2 group transition-all duration-300"
//                 onClick={() => window.location.reload()}
//             >
//                 <span>Try again</span>
//                 <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//             </button>
//         </div>
//     );

//     // Handle retry when data fetching fails
//     const handleRetry = () => {
//         setLoading(true);
//         setDataError(false);
//         window.location.reload();
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
//             {/* Animated gradient background */}
//             <div className="absolute inset-0 bg-black z-0 overflow-hidden">
//                 <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-teal-900/20 rounded-full blur-3xl animate-blob1"></div>
//                 <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-900/20 rounded-full blur-3xl animate-blob2"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-3xl animate-blob3"></div>
//             </div>

//             {/* Content with glass effect */}
//             <div className="relative z-10">
//                 {/* Header */}
//                 <header className="backdrop-blur-xl bg-black/70 py-4 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-20">
//                     <div className="flex items-center space-x-2">
//                         <div className="bg-gradient-to-br from-teal-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
//                             <Code size={24} className="text-black" />
//                         </div>
//                         <Link href="/"><h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">AlgoStub</h1></Link>
//                     </div>
//                     <div className="relative w-1/3">
//                         <input
//                             type="text"
//                             placeholder="Search problems..."
//                             className="w-full bg-gray-900/80 border border-gray-800 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
//                         />
//                         <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <div className="bg-gray-900 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
//                             <Award className="text-yellow-400" size={20} />
//                         </div>
//                         <UserButton />
//                     </div>
//                 </header>

//                 {/* Main Content */}
//                 <div className="max-w-6xl mx-auto pt-8 px-4 pb-16">
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-3xl font-bold">DSA Practice</h2>
//                         <div className="flex space-x-2">
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'all' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('all')}>All Problems</button>
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'my' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('my')}>My List</button>
//                             <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'completed' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={() => setActiveTab('completed')}>Completed</button>
//                         </div>
//                     </div>

//                     {loading ? (
//                         // Loading state with MongoDB-specific message
//                         <div className="flex flex-col items-center justify-center py-20">
//                             <Loader2 size={48} className="text-teal-500 animate-spin mb-4" />
//                             <p className="text-gray-400">Loading data from MongoDB...</p>
//                         </div>
//                     ) : dataError ? (
//                         renderEmptyState()
//                     ) : (
//                         <>
//                             {/* Stats */}
//                             {stats && (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-teal-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Total Problems</p>
//                                                 <p className="text-2xl font-bold group-hover:text-teal-400 transition-colors">{stats.total}</p>
//                                             </div>
//                                             <div className="bg-teal-900/30 p-2 rounded-lg group-hover:bg-teal-900/50 transition-colors">
//                                                 <BookOpen className="text-teal-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-teal-400">+{stats.newThisWeek}</span> new this week
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-green-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Solved</p>
//                                                 <p className="text-2xl font-bold group-hover:text-green-400 transition-colors">{stats.solved}</p>
//                                             </div>
//                                             <div className="bg-green-900/30 p-2 rounded-lg group-hover:bg-green-900/50 transition-colors">
//                                                 <CheckCircle className="text-green-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">{stats.completionRate}</span> completion rate
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-yellow-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Attempts</p>
//                                                 <p className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{stats.attempts}</p>
//                                             </div>
//                                             <div className="bg-yellow-900/30 p-2 rounded-lg group-hover:bg-yellow-900/50 transition-colors">
//                                                 <Clock className="text-yellow-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">{stats.successRate}</span> success rate
//                                         </div>
//                                     </div>
//                                     <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-purple-800/50 transition-colors group">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-400">Current Streak</p>
//                                                 <p className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{stats.streak} days</p>
//                                             </div>
//                                             <div className="bg-purple-900/30 p-2 rounded-lg group-hover:bg-purple-900/50 transition-colors">
//                                                 <Award className="text-purple-400" size={20} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-2 text-sm text-gray-400">
//                                             <span className="text-green-400">+{stats.streakGrowth}</span> from last week
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Topic List */}
//                             {topics.length > 0 ? (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden mb-8">
//                                     <div className="p-4 border-b border-gray-800">
//                                         <h3 className="text-xl font-bold">Topics</h3>
//                                     </div>
//                                     <div>
//                                         {topics.map((topic) => (
//                                             <div key={topic.id} className="border-b border-gray-800 last:border-b-0">
//                                                 <div
//                                                     className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/60 transition-colors"
//                                                     onClick={() => toggleTopic(topic.id)}
//                                                 >
//                                                     <div className="flex items-center space-x-3">
//                                                         {getIconComponent(topic.icon)}
//                                                         <span className="font-medium">{topic.name}</span>
//                                                         <span className="text-sm text-gray-400">{topic.count} problems</span>
//                                                     </div>
//                                                     <div className="transform transition-transform duration-300">
//                                                         {expandedTopic === topic.id ?
//                                                             <ChevronDown size={20} className="text-gray-400" /> :
//                                                             <ChevronRight size={20} className="text-gray-400" />
//                                                         }
//                                                     </div>
//                                                 </div>

//                                                 {expandedTopic === topic.id && (
//                                                     <div className="bg-black/40 pb-2 animate-fadeIn">
//                                                         {topic.questions.map((question) => (
//                                                             <div key={question.id} className="flex items-center justify-between p-3 mx-2 my-1 rounded-lg hover:bg-gray-800/80 group cursor-pointer transition-all duration-300">
//                                                                 <div className="flex items-center space-x-3">
//                                                                     {question.solved ?
//                                                                         <CheckCircle size={18} className="text-green-400" /> :
//                                                                         <div className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-teal-500 transition-colors" />
//                                                                     }
//                                                                     <span className="group-hover:text-teal-400 transition-colors">{question.title}</span>
//                                                                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
//                                                                         {question.difficulty}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex items-center space-x-4">
//                                                                     <div className="text-sm text-gray-400 flex items-center space-x-1">
//                                                                         <Award size={16} />
//                                                                         <span>{question.likes}</span>
//                                                                     </div>
//                                                                     <ArrowUpRight size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                         <div className="text-center py-2">
//                                                             <button className="text-teal-400 text-sm hover:text-teal-300 group flex items-center justify-center mx-auto space-x-1">
//                                                                 <span>View all {topic.count} problems</span>
//                                                                 <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-8 text-center">
//                                     <AlertTriangle className="text-yellow-500 mx-auto mb-4" size={40} />
//                                     <h3 className="text-xl font-bold mb-2">No Topics Available</h3>
//                                     <p className="text-gray-400 max-w-md mx-auto mb-6">
//                                         Couldn't find any DSA topics in our MongoDB database. Try refreshing or check back later.
//                                     </p>
//                                     <button
//                                         className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-teal-100 rounded-lg font-medium"
//                                         onClick={handleRetry}
//                                     >
//                                         Refresh Data
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Daily Challenge */}
//                             {dailyChallenge ? (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden">
//                                     <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//                                         <h3 className="text-xl font-bold">Daily Challenge</h3>
//                                         <span className="text-sm text-gray-400 flex items-center">
//                                             <Clock size={14} className="mr-1" />
//                                             Resets in {dailyChallenge.resetTime}
//                                         </span>
//                                     </div>
//                                     <div className="p-6">
//                                         <div className="mb-4 flex justify-between items-start">
//                                             <div>
//                                                 <h4 className="text-lg font-bold text-teal-400 mb-1">{dailyChallenge.title}</h4>
//                                                 <div className="flex items-center space-x-3 text-sm">
//                                                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(dailyChallenge.difficulty)}`}>
//                                                         {dailyChallenge.difficulty}
//                                                     </span>
//                                                     <span className="text-gray-400">{dailyChallenge.category}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="flex space-x-2">
//                                                 <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1">
//                                                     <BookOpen size={16} />
//                                                     <span>Hints</span>
//                                                 </button>
//                                                 <button className="px-3 py-1.5 bg-teal-900 hover:bg-teal-800 rounded-lg text-sm text-teal-100 flex items-center space-x-1">
//                                                     <Code size={16} />
//                                                     <span>Solve</span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className="text-gray-300 mb-4">{dailyChallenge.description}</p>
//                                         <div className="bg-black/60 rounded-lg p-4 my-4 font-mono text-sm text-gray-300 border border-gray-800">
//                                             <pre>{dailyChallenge.example}</pre>
//                                         </div>
//                                         <div className="flex items-center justify-between text-sm">
//                                             <div className="flex items-center space-x-4 text-gray-400">
//                                                 <span className="flex items-center">
//                                                     <Award size={16} className="mr-1" />
//                                                     {dailyChallenge.pointsReward} points
//                                                 </span>
//                                                 <span className="flex items-center">
//                                                     <CheckCircle size={16} className="mr-1" />
//                                                     {dailyChallenge.solvedBy} solved today
//                                                 </span>
//                                             </div>
//                                             <div>
//                                                 <button className="text-teal-400 hover:text-teal-300 flex items-center space-x-1 group">
//                                                     <span>View Solution</span>
//                                                     <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-8 text-center">
//                                     <Clock className="text-teal-500 mx-auto mb-4" size={40} />
//                                     <h3 className="text-xl font-bold mb-2">No Challenge Available</h3>
//                                     <p className="text-gray-400 max-w-md mx-auto">
//                                         Today's challenge hasn't been loaded yet or could not be retrieved from the database.
//                                     </p>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//                 <FooterSection />
//             </div>
//         </div>
//     );
// }



'use client';
import { useState, useEffect } from 'react';
import {
    Search, Code, Brain, Award, ChevronRight, ChevronDown, BookOpen, BarChart2,
    Clock, CheckCircle, ArrowUpRight, Loader2, Terminal, Shield, Database, AlertTriangle
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { FooterSection } from '../components/footer/FooterSection';
import Link from 'next/link';
import { UserButton } from "@clerk/clerk-react";
import QuoteSection from '../components/QuoteSection';
import ProfessionalQuoteSection from '../components/QuoteSection';
import SingleLineQuoteSection from '../components/QuoteSection';
import { DM_Sans } from 'next/font/google';

export default function AlgostubDSAPractice() {
    const [activeTab, setActiveTab] = useState('all');
    const [expandedTopic, setExpandedTopic] = useState('arrays');
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [dailyChallenge, setDailyChallenge] = useState(null);
    const [stats, setStats] = useState(null);
    const [dataError, setDataError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fullTopicView, setFullTopicView] = useState(null);
    const [allProblems, setAllProblems] = useState([]);
    const [markingAsSolved, setMarkingAsSolved] = useState(false);

    const toggleTopic = (topic) => {
        setExpandedTopic(expandedTopic === topic ? null : topic);
    };

    // Fetch data from MongoDB through API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/dsa-problems');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch data');
                }

                if (data.success) {
                    setTopics(data.topics || []);
                    setDailyChallenge(data.dailyChallenge);
                    setStats(data.stats);
                    setDataError(false);

                    // Extract all problems from topics for filtering
                    let problems = [];
                    data.topics.forEach(topic => {
                        if (topic.questions) {
                            problems = [...problems, ...topic.questions.map(q => ({ ...q, topic: topic.name }))];
                        }
                    });
                    setAllProblems(problems);
                } else {
                    setDataError(true);
                    setErrorMessage(data.message || 'No data available');
                    setTopics([]);
                    setDailyChallenge(null);
                    setStats(null);

                    // Show error toast
                    toast.error('Data Error', {
                        description: data.message || 'No data available',
                        duration: 5000,
                    });
                }
            } catch (error) {
                console.error("Error fetching DSA problems:", error);
                setDataError(true);
                setErrorMessage(error.message || 'Failed to connect to database');
                setTopics([]);
                setDailyChallenge(null);
                setStats(null);

                // Show error toast
                toast.error('Connection Error', {
                    description: error.message || 'Failed to connect to database',
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to mark a problem as solved
    const markAsSolved = async (problemId, problemTitle) => {
        try {
            setMarkingAsSolved(true);
            toast.loading(`Marking "${problemTitle}" as solved...`);

            const response = await fetch('/api/mark-solved', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problemId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to mark problem as solved');
            }

            if (data.success) {
                toast.success('Problem Solved!', {
                    description: `"${problemTitle}" has been marked as solved`,
                });

                // Update local state with the new solved problems
                const updatedTopics = topics.map(topic => {
                    const updatedQuestions = topic.questions.map(question => {
                        if (question.id === problemId) {
                            return { ...question, solved: true };
                        }
                        return question;
                    });

                    return { ...topic, questions: updatedQuestions };
                });

                setTopics(updatedTopics);

                // Update all problems list
                const updatedAllProblems = allProblems.map(problem => {
                    if (problem.id === problemId) {
                        return { ...problem, solved: true };
                    }
                    return problem;
                });

                setAllProblems(updatedAllProblems);

                // Update stats
                if (stats) {
                    setStats({
                        ...stats,
                        solved: data.stats.solved,
                        attempts: data.stats.attempts,
                        streak: data.stats.streak,
                        completionRate: ((data.stats.solved / stats.total) * 100).toFixed(1) + '%',
                        successRate: ((data.stats.solved / data.stats.attempts) * 100).toFixed(1) + '%'
                    });
                }
            } else {
                toast.error('Error', {
                    description: data.message || 'Failed to mark problem as solved',
                });
            }
        } catch (error) {
            console.error("Error marking problem as solved:", error);
            toast.error('Connection Error', {
                description: error.message || 'Failed to connect to database',
            });
        } finally {
            setMarkingAsSolved(false);
        }
    };

    // Function to load all topic problems
    const loadAllTopicProblems = async (topicId, topicName) => {
        try {
            toast.info(`Loading all ${topicName} problems...`);

            // Here you would typically fetch complete list from backend
            // For now, we'll just simulate it by filtering existing problems
            const topicProblems = allProblems.filter(problem => {
                const topic = topics.find(t => t.id === topicId);
                return topic && problem.topic === topic.name;
            });

            setFullTopicView({
                id: topicId,
                name: topicName,
                problems: topicProblems
            });

        } catch (error) {
            console.error("Error loading all topic problems:", error);
            toast.error('Error', {
                description: 'Failed to load all problems for this topic',
            });
        }
    };

    // Function to close full topic view
    const closeFullTopicView = () => {
        setFullTopicView(null);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-900/30 text-green-400 border border-green-700/50';
            case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50';
            case 'Hard': return 'bg-red-900/30 text-red-400 border border-red-700/50';
            default: return 'bg-gray-900 text-gray-400 border border-gray-700/50';
        }
    };

    const getIconComponent = (iconName) => {
        const iconMap = {
            'Code': <Code className="text-teal-400" size={20} />,
            'ChevronRight': <ChevronRight className="text-green-400" size={20} />,
            'BookOpen': <BookOpen className="text-blue-400" size={20} />,
            'Brain': <Brain className="text-purple-400" size={20} />,
            'BarChart2': <BarChart2 className="text-yellow-400" size={20} />,
            'Shield': <Shield className="text-red-400" size={20} />,
            'Terminal': <Terminal className="text-orange-400" size={20} />
        };

        return iconMap[iconName] || <BookOpen className="text-gray-400" size={20} />;
    };

    // Filtered problems based on active tab
    const getFilteredProblems = () => {
        switch (activeTab) {
            case 'my':
                // In a real app, you'd typically fetch the user's list from the database
                // For now, we'll just return all problems
                return allProblems;
            case 'completed':
                return allProblems.filter(problem => problem.solved);
            case 'all':
            default:
                return allProblems;
        }
    };

    // Empty state display with custom message
    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 text-center border-teal-500 border-2 rounded-xl">
            <Database className="text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-400 mb-2">
                {errorMessage || "No data available"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
                {dataError ?
                    "We couldn't fetch your DSA problems from MongoDB. This might be due to connection issues or no problems have been added yet." :
                    "There are no problems in the database. Try adding some problems first."}
            </p>
            <button
                className="px-4 py-2 bg-teal-900 hover:bg-teal-800 text-teal-100 rounded-lg font-medium flex items-center space-x-2 group transition-all duration-300"
                onClick={() => window.location.reload()}
            >
                <span>Try again</span>
                <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );

    // Handle retry when data fetching fails
    const handleRetry = () => {
        setLoading(true);
        setDataError(false);

        // Show loading toast
        toast.loading('Refreshing data...');

        // Fetch data again
        window.location.reload();
    };

    // Render full topic view component
    const renderFullTopicView = () => {
        if (!fullTopicView) return null;

        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-30 flex items-center justify-center p-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold">{fullTopicView.name} Problems</h3>
                        <button
                            className="p-2 rounded-full hover:bg-gray-800"
                            onClick={closeFullTopicView}
                        >
                            <span className="sr-only">Close</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2">
                        {fullTopicView.problems.length > 0 ? (
                            fullTopicView.problems.map((problem) => (
                                <div
                                    key={problem.id}
                                    className="flex items-center justify-between p-3 mx-2 my-1 rounded-lg hover:bg-gray-800/80 group cursor-pointer transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${problem.solved ? 'bg-green-900/30' : 'border border-gray-600 group-hover:border-teal-500'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!problem.solved && !markingAsSolved) {
                                                    markAsSolved(problem.id, problem.title);
                                                }
                                            }}
                                        >
                                            {problem.solved && <CheckCircle size={16} className="text-green-400" />}
                                        </div>
                                        <span className="group-hover:text-teal-400 transition-colors">{problem.title}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-sm text-gray-400 flex items-center space-x-1">
                                            <Award size={16} />
                                            <span>{problem.likes || 0}</span>
                                        </div>
                                        <button
                                            className="px-3 py-1.5 bg-teal-900 hover:bg-teal-800 rounded-lg text-sm text-teal-100 flex items-center space-x-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toast.success('Problem Selected', { description: `Opening ${problem.title}...` });
                                            }}
                                        >
                                            <Code size={16} />
                                            <span>Solve</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No problems found for this topic.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
            {/* Add Sonner Toaster component */}
            <Toaster richColors position="top-right" />

            {/* Full Topic View Modal */}
            {renderFullTopicView()}

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-black z-0 overflow-hidden">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-teal-900/20 rounded-full blur-3xl animate-blob1"></div>
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-900/20 rounded-full blur-3xl animate-blob2"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-3xl animate-blob3"></div>
            </div>

            {/* Content with glass effect */}
            <div className="relative z-10">
                {/* Header */}
                <header className="backdrop-blur-xl bg-black/70 py-4 px-8 flex justify-between items-center border-b border-gray-800 sticky top-0 z-20">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-teal-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                            <Code size={24} className="text-black" />
                        </div>
                        <Link href="/"><h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">AlgoStub</h1></Link>
                    </div>
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="w-full bg-gray-900/80 border border-gray-800 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-900 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <Award className="text-yellow-400" size={20} />
                        </div>
                        <UserButton />
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto pt-8 px-4 pb-16">
                    <SingleLineQuoteSection className="px-8" />
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">DSA Practice</h2>
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'all' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`}
                                onClick={() => {
                                    setActiveTab('all');
                                    toast.success('Filter Applied', { description: 'Showing all problems' });
                                }}
                            >
                                All Problems
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'my' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`}
                                onClick={() => {
                                    setActiveTab('my');
                                    toast.success('Filter Applied', { description: 'Showing your list' });
                                }}
                            >
                                My List
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'completed' ? 'bg-gradient-to-r from-teal-600 to-indigo-600 shadow-lg shadow-teal-900/30' : 'bg-gray-900 hover:bg-gray-800'}`}
                                onClick={() => {
                                    setActiveTab('completed');
                                    toast.success('Filter Applied', { description: 'Showing completed problems' });
                                }}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        // Loading state with MongoDB-specific message
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 size={48} className="text-teal-500 animate-spin mb-4" />
                            <p className="text-gray-400">Loading data from MongoDB...</p>
                        </div>
                    ) : dataError ? (
                        renderEmptyState()
                    ) : (
                        <>
                            {/* Stats */}
                            {stats && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-teal-800/50 transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-400">Total Problems</p>
                                                <p className="text-2xl font-bold group-hover:text-teal-400 transition-colors">{stats.total}</p>
                                            </div>
                                            <div className="bg-teal-900/30 p-2 rounded-lg group-hover:bg-teal-900/50 transition-colors">
                                                <BookOpen className="text-teal-400" size={20} />
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-400">
                                            <span className="text-teal-400">+{stats.newThisWeek}</span> new this week
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-green-800/50 transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-400">Solved</p>
                                                <p className="text-2xl font-bold group-hover:text-green-400 transition-colors">{stats.solved}</p>
                                            </div>
                                            <div className="bg-green-900/30 p-2 rounded-lg group-hover:bg-green-900/50 transition-colors">
                                                <CheckCircle className="text-green-400" size={20} />
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-400">
                                            <span className="text-green-400">{stats.completionRate}</span> completion rate
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-yellow-800/50 transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-400">Attempts</p>
                                                <p className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{stats.attempts}</p>
                                            </div>
                                            <div className="bg-yellow-900/30 p-2 rounded-lg group-hover:bg-yellow-900/50 transition-colors">
                                                <Clock className="text-yellow-400" size={20} />
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-400">
                                            <span className="text-green-400">{stats.successRate}</span> success rate
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-800 hover:border-purple-800/50 transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-400">Current Streak</p>
                                                <p className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{stats.streak} days</p>
                                            </div>
                                            <div className="bg-purple-900/30 p-2 rounded-lg group-hover:bg-purple-900/50 transition-colors">
                                                <Award className="text-purple-400" size={20} />
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-400">
                                            <span className="text-green-400">+{stats.streakGrowth}</span> from last week
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Topic List */}
                            {topics.length > 0 ? (
                                <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden mb-8">
                                    <div className="p-4 border-b border-gray-800">
                                        <h3 className="text-xl font-bold">Topics</h3>
                                    </div>
                                    <div>
                                        {topics.map((topic) => (
                                            <div key={topic.id} className="border-b border-gray-800 last:border-b-0">
                                                <div
                                                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/60 transition-colors"
                                                    onClick={() => toggleTopic(topic.id)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {getIconComponent(topic.icon)}
                                                        <span className="font-medium">{topic.name}</span>
                                                        <span className="text-sm text-gray-400">{topic.count} problems</span>
                                                    </div>
                                                    <div className="transform transition-transform duration-300">
                                                        {expandedTopic === topic.id ?
                                                            <ChevronDown size={20} className="text-gray-400" /> :
                                                            <ChevronRight size={20} className="text-gray-400" />
                                                        }
                                                    </div>
                                                </div>

                                                {expandedTopic === topic.id && (
                                                    <div className="bg-black/40 pb-2 animate-fadeIn">
                                                        {topic.questions.map((question) => (
                                                            <div
                                                                key={question.id}
                                                                className="flex items-center justify-between p-3 mx-2 my-1 rounded-lg hover:bg-gray-800/80 group cursor-pointer transition-all duration-300"
                                                                onClick={() => toast.info(`Problem Selected: ${question.title}`)}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div
                                                                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${question.solved ? 'bg-green-900/30' : 'border border-gray-600 group-hover:border-teal-500'}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            if (!question.solved && !markingAsSolved) {
                                                                                markAsSolved(question.id, question.title);
                                                                            }
                                                                        }}
                                                                    >
                                                                        {question.solved && <CheckCircle size={16} className="text-green-400" />}
                                                                    </div>
                                                                    <span className="group-hover:text-teal-400 transition-colors">{question.title}</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                                                                        {question.difficulty}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-4">
                                                                    <button
                                                                        className="px-3 py-1.5 bg-teal-900 hover:bg-teal-800 rounded-lg text-sm text-teal-100 flex items-center space-x-1"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toast.success('Problem Selected', { description: `Opening ${question.title}...` });
                                                                        }}
                                                                    >
                                                                        <Code size={16} />
                                                                        <span>Solve</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {topic.questions.length > 0 && (
                                                            <div className="text-center mt-2">
                                                                <button
                                                                    className="px-4 py-2 text-sm text-teal-400 hover:text-teal-300 transition-colors"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        loadAllTopicProblems(topic.id, topic.name);
                                                                    }}
                                                                >
                                                                    View all {topic.name} problems
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-800 rounded-xl bg-gray-900/60">
                                    <AlertTriangle className="text-yellow-400 mb-4" size={48} />
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">No topics found</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        There are no DSA topics available in the database. This might be because it's your first time or the data hasn't been properly initialized.
                                    </p>
                                </div>
                            )}

                            {/* Daily Challenge */}
                            {dailyChallenge ? (
                                <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden">
                                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                                        <h3 className="text-xl font-bold">Daily Challenge</h3>
                                        <span className="text-sm text-gray-400 flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            Resets in {dailyChallenge.resetTime}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4 flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-bold text-teal-400 mb-1">{dailyChallenge.title}</h4>
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(dailyChallenge.difficulty)}`}>
                                                        {dailyChallenge.difficulty}
                                                    </span>
                                                    <span className="text-gray-400">{dailyChallenge.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
                                                    onClick={() => toast.info('Hints', { description: 'Hint system opening soon!' })}
                                                >
                                                    <BookOpen size={16} />
                                                    <span>Hints</span>
                                                </button>
                                                <button
                                                    className="px-3 py-1.5 bg-teal-900 hover:bg-teal-800 rounded-lg text-sm text-teal-100 flex items-center space-x-1"
                                                    onClick={() => toast.success('Challenge Accepted!', { description: 'Opening code editor...' })}
                                                >
                                                    <Code size={16} />
                                                    <span>Solve</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mb-4">{dailyChallenge.description}</p>
                                        <div className="bg-black/60 rounded-lg p-4 my-4 font-mono text-sm text-gray-300 border border-gray-800">
                                            <pre>{dailyChallenge.example}</pre>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-4 text-gray-400">
                                                <span className="flex items-center">
                                                    <Award size={16} className="mr-1" />
                                                    {dailyChallenge.pointsReward} points
                                                </span>
                                                <span className="flex items-center">
                                                    <CheckCircle size={16} className="mr-1" />
                                                    {dailyChallenge.solvedBy} solved today
                                                </span>
                                            </div>
                                            <div>
                                                <button
                                                    className="text-teal-400 hover:text-teal-300 flex items-center space-x-1 group"
                                                    onClick={() => toast.info('Solutions will be available after you attempt the problem!')}
                                                >
                                                    <span>View Solution</span>
                                                    <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-8 text-center">
                                    <Clock className="text-teal-500 mx-auto mb-4" size={40} />
                                    <h3 className="text-xl font-bold mb-2">No Challenge Available</h3>
                                    <p className="text-gray-400 max-w-md mx-auto">
                                        Today's challenge hasn't been loaded yet or could not be retrieved from the database.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <FooterSection />
            </div>
        </div>
    );
}