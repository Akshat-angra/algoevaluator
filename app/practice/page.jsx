"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Building2, Clock, BarChart2, Filter, Tag, ChevronDown, Zap, Trophy, Target, ExternalLink, Code2, Brain, Blocks, Sparkles } from 'lucide-react';
import { FooterSection } from '../components/footer/FooterSection';
import { motion } from 'framer-motion';

import { Amaranth, Quicksand } from "next/font/google";

const amaranth = Amaranth({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const quick = Quicksand({
    subsets: ['latin'],
    weight: ['500', '700']
});


const CODING_QUESTIONS = [
    {
        id: '1',
        title: 'Two Sum',
        company: 'Google',
        difficulty: 'Easy',
        category: 'Arrays',
        timesSeen: 145,
        lastSeen: '2024-03-15',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        sampleInput: 'nums = [2,7,11,15], target = 9',
        sampleOutput: '[0,1]',
        constraints: 'Only one valid answer exists.',
        platforms: [
            { name: 'LeetCode', url: 'https://leetcode.com/problems/two-sum' },
            { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/two-sum/1' },
            { name: 'HackerRank', url: 'https://www.hackerrank.com/challenges/two-sum' }
        ]
    },
    {
        id: '2',
        title: 'LRU Cache',
        company: 'Meta',
        difficulty: 'Hard',
        category: 'Design',
        timesSeen: 89,
        lastSeen: '2024-03-14',
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
        sampleInput: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]',
        sampleOutput: '[null, null, null, 1, null, -1, null, 3, 4, 4]',
        constraints: 'Capacity is positive integer',
        platforms: [
            { name: 'LeetCode', url: 'https://leetcode.com/problems/lru-cache' },
            { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/lru-cache/1' }
        ]
    },
    {
        id: '3',
        title: 'Merge Intervals',
        company: 'Amazon',
        difficulty: 'Medium',
        category: 'Arrays',
        timesSeen: 112,
        lastSeen: '2024-03-13',
        description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
        sampleInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        sampleOutput: '[[1,6],[8,10],[15,18]]',
        constraints: 'intervals[i][0] <= intervals[i][1]',
        platforms: [
            { name: 'LeetCode', url: 'https://leetcode.com/problems/merge-intervals' },
            { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org/problems/merge-intervals/1' },
            { name: 'HackerRank', url: 'https://www.hackerrank.com/challenges/merge-intervals' }
        ]
    }
];

const COMPANIES = ['All', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const CATEGORIES = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Design'];

const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'leetcode':
            return <Code2 className="w-4 h-4" />;
        case 'geeksforgeeks':
            return <Brain className="w-4 h-4" />;
        case 'hackerrank':
            return <Blocks className="w-4 h-4" />;
        default:
            return <ExternalLink className="w-4 h-4" />;
    }
};

function PracticeSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('timesSeen');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredQuestions = useMemo(() => {
        return CODING_QUESTIONS.filter(question => {
            const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                question.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCompany = selectedCompany === 'All' || question.company === selectedCompany;
            const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
            const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory;

            return matchesSearch && matchesCompany && matchesDifficulty && matchesCategory;
        }).sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (sortBy === 'timesSeen') {
                return (a.timesSeen - b.timesSeen) * order;
            }
            return (new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime()) * order;
        });
    }, [searchQuery, selectedCompany, selectedDifficulty, selectedCategory, sortBy, sortOrder]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
            case 'Medium':
                return 'text-amber-400 bg-amber-400/10 border border-amber-400/20';
            case 'Hard':
                return 'text-rose-400 bg-rose-400/10 border border-rose-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border border-gray-400/20';
        }
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return <Zap className="w-4 h-4" />;
            case 'Medium':
                return <Target className="w-4 h-4" />;
            case 'Hard':
                return <Trophy className="w-4 h-4" />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="relative overflow-hidden bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-b border-white/10">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ${quick.className}`}>
                            Practice Arena
                        </h1>
                        <p className={`text-2xl text-gray-300 max-w-2xl mx-auto ${amaranth.className}`}>
                            Master your coding skills with our curated collection of interview questions from top tech companies.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-white placeholder-gray-400"
                            />
                        </div>

                        {[
                            { value: selectedCompany, setter: setSelectedCompany, options: COMPANIES, icon: <Building2 className="w-5 h-5" />, label: 'Company' },
                            { value: selectedDifficulty, setter: setSelectedDifficulty, options: DIFFICULTIES, icon: <Sparkles className="w-5 h-5" />, label: 'Difficulty' },
                            { value: selectedCategory, setter: setSelectedCategory, options: CATEGORIES, icon: <Tag className="w-5 h-5" />, label: 'Topic' }
                        ].map((select, index) => (
                            <div key={index} className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    {select.icon}
                                </div>
                                <select
                                    value={select.value}
                                    onChange={(e) => select.setter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-white appearance-none cursor-pointer"
                                >
                                    {select.options.map(option => (
                                        <option key={option} value={option} className="bg-[#1a1a1a]">
                                            {option === 'All' ? `All ${select.label}s` : option}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="absolute inset-0 opacity-50 z-10">
                    {[
                        { name: "React", x: "10%", y: "20%", delay: 0 },
                        { name: "Node.js", x: "80%", y: "15%", delay: 0.5 },
                        { name: "Python", x: "20%", y: "70%", delay: 1 },
                        { name: "TypeScript", x: "70%", y: "60%", delay: 1.5 },
                        { name: "Java", x: "40%", y: "85%", delay: 2 },
                    ].map((tech, index) => (
                        <motion.div
                            key={index}
                            className={`absolute text-xs font-mono bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20 ${quick.className}`}
                            style={{ left: tech.x, top: tech.y }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 0.8,
                                y: [0, -10, 0],
                                transition: {
                                    opacity: { duration: 1, delay: tech.delay },
                                    y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: tech.delay },
                                },
                            }}
                        >
                            {tech.name}
                        </motion.div>
                    ))}
                </div>

                {/* Sort Controls */}
                <div className="flex justify-end mb-6 space-x-4">
                    <button
                        onClick={() => {
                            setSortBy('timesSeen');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
                            ${sortBy === 'timesSeen' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                    >
                        <BarChart2 className="w-4 h-4" />
                        <span>Frequency</span>
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                        onClick={() => {
                            setSortBy('lastSeen');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
                            ${sortBy === 'lastSeen' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                    >
                        <Clock className="w-4 h-4" />
                        <span>Date</span>
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredQuestions.map(question => (
                        <div
                            key={question.id}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.07]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/3 group-hover:via-blue-500/5 group-hover:to-purple-500/3 transition-all duration-500" />

                            <div className="relative p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 mb-3">
                                            {question.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                                                <Building2 className="w-4 h-4" />
                                                <span>{question.company}</span>
                                            </div>
                                            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${getDifficultyColor(question.difficulty)}`}>
                                                {getDifficultyIcon(question.difficulty)}
                                                <span>{question.difficulty}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                                                <Tag className="w-4 h-4" />
                                                <span>{question.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            Seen {question.timesSeen} times
                                        </div>
                                        <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            Last: {new Date(question.lastSeen).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {question.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {question.sampleInput && (
                                        <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                            <div className="font-medium text-gray-300 mb-2">Sample Input:</div>
                                            <code className="text-sm text-blue-400 font-mono">{question.sampleInput}</code>
                                        </div>
                                    )}
                                    {question.sampleOutput && (
                                        <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                            <div className="font-medium text-gray-300 mb-2">Sample Output:</div>
                                            <code className="text-sm text-purple-400 font-mono">{question.sampleOutput}</code>
                                        </div>
                                    )}
                                </div>

                                {question.constraints && (
                                    <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6">
                                        <div className="text-sm text-gray-300">
                                            <strong className="text-white">Constraints:</strong> {question.constraints}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {question.platforms.map((platform, index) => (
                                        <a
                                            key={index}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 
                                            text-gray-300 rounded-xl border border-white/10 transition-all duration-200"
                                        >
                                            {getPlatformIcon(platform.name)}
                                            <span>{platform.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FooterSection />
        </div>
    );
}

export default PracticeSection;