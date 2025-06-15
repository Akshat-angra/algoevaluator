'use client';
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, School, Award, ArrowRight, ChevronDown, ChevronUp, Users, MapPin, Globe, Zap } from 'lucide-react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})

export default function CollegeAdmissionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('colleges');
    const [expandedCollege, setExpandedCollege] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Sample college data - would be fetched from your backend in a real application
    const colleges = [
        {
            id: 1,
            name: "Tech Institute of Innovation",
            location: "San Francisco, CA",
            programs: ["Computer Science", "Data Science", "AI & Machine Learning"],
            rating: 4.8,
            admissionRate: "22%",
            coursesOffered: 42,
            image: "/api/placeholder/400/250"
        },
        {
            id: 2,
            name: "Digital Arts University",
            location: "New York, NY",
            programs: ["Digital Design", "Animation", "UI/UX Design"],
            rating: 4.6,
            admissionRate: "35%",
            coursesOffered: 38,
            image: "/api/placeholder/400/250"
        },
        {
            id: 3,
            name: "Future Engineering College",
            location: "Austin, TX",
            programs: ["Robotics", "Software Engineering", "Systems Design"],
            rating: 4.7,
            admissionRate: "28%",
            coursesOffered: 45,
            image: "/api/placeholder/400/250"
        }
    ];

    // Animation effect when page loads
    useEffect(() => {
        setShowAnimation(true);
    }, []);

    const filteredColleges = colleges.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const toggleCollege = (id) => {
        setExpandedCollege(expandedCollege === id ? null : id);
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${dmSans.className}`}>
            {/* Hero Section with Animation */}
            <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6 transition-all duration-1000 ease-in-out ${showAnimation ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect College Match</h1>
                    <p className="text-xl mb-8">Get lifetime free access to admission-related courses when you apply through algoEvaluator</p>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search colleges, locations, or programs..."
                            className="w-full py-4 pl-12 pr-4 rounded-lg text-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-lg">
                            <BookOpen className="h-6 w-6 mr-3" />
                            <span>2000+ Courses</span>
                        </div>
                        <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-lg">
                            <School className="h-6 w-6 mr-3" />
                            <span>500+ Colleges</span>
                        </div>
                        <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-lg">
                            <Users className="h-6 w-6 mr-3" />
                            <span>10K+ Students</span>
                        </div>
                        <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-lg">
                            <Award className="h-6 w-6 mr-3" />
                            <span>Lifetime Access</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Tabs */}
                <div className={`flex border-b mb-8 transition-all duration-700 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={() => setActiveTab('colleges')}
                        className={`px-6 py-3 font-medium text-lg ${activeTab === 'colleges' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    >
                        Colleges
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`px-6 py-3 font-medium text-lg ${activeTab === 'courses' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    >
                        Free Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('application')}
                        className={`px-6 py-3 font-medium text-lg ${activeTab === 'application' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    >
                        Application Process
                    </button>
                </div>

                {/* Colleges Tab Content */}
                {activeTab === 'colleges' && (
                    <div className={`transition-all duration-700 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
                        {filteredColleges.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8">
                                {filteredColleges.map((college) => (
                                    <div key={college.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <div className="md:flex">
                                            <div className="md:w-1/3">
                                                <img
                                                    src={college.image}
                                                    alt={college.name}
                                                    className="h-64 w-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6 md:w-2/3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-800">{college.name}</h2>
                                                        <div className="flex items-center mt-2 text-gray-600">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            <span>{college.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        {college.admissionRate} Admission Rate
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {college.programs.map((program, idx) => (
                                                        <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                                            {program}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="mt-6 flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-5 h-5 ${i < Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-gray-600">{college.rating} rating</span>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleCollege(college.id)}
                                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                                    >
                                                        {expandedCollege === college.id ? (
                                                            <>
                                                                <span className="mr-1">Less info</span>
                                                                <ChevronUp className="h-5 w-5" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="mr-1">More info</span>
                                                                <ChevronDown className="h-5 w-5" />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {expandedCollege === college.id && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                                                        <h3 className="font-semibold text-lg mb-2">Why Choose {college.name}?</h3>
                                                        <ul className="space-y-2 text-gray-700">
                                                            <li className="flex items-start">
                                                                <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</div>
                                                                <span>State-of-the-art facilities and research opportunities</span>
                                                            </li>
                                                            <li className="flex items-start">
                                                                <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</div>
                                                                <span>Industry connections and internship placements</span>
                                                            </li>
                                                            <li className="flex items-start">
                                                                <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</div>
                                                                <span>Comprehensive career services and alumni network</span>
                                                            </li>
                                                        </ul>

                                                        <div className="mt-6 flex justify-between">
                                                            <span className="text-gray-700"><span className="font-semibold">{college.coursesOffered}</span> courses offered</span>
                                                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center transition-colors duration-300">
                                                                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No colleges found matching your search criteria.</p>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 text-blue-600 hover:text-blue-800"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Free Courses Tab Content */}
                {activeTab === 'courses' && (
                    <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-700 ease-in-out transform">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Exclusive Free Courses</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Course Card 1 */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition-all">
                                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">College Application Mastery</h3>
                                <p className="text-gray-600 mb-4">Learn how to create standout applications that get noticed by admission officers.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">12 lessons</span>
                                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                                        Access <ArrowRight className="ml-1 h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Course Card 2 */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow hover:shadow-lg transition-all">
                                <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Scholarship Hunting Strategies</h3>
                                <p className="text-gray-600 mb-4">Discover how to find and secure scholarships to fund your higher education.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">9 lessons</span>
                                    <button className="text-purple-600 hover:text-purple-800 flex items-center">
                                        Access <ArrowRight className="ml-1 h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Course Card 3 */}
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow hover:shadow-lg transition-all">
                                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <Globe className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">College Interview Preparation</h3>
                                <p className="text-gray-600 mb-4">Master the art of college interviews with techniques from admission experts.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">8 lessons</span>
                                    <button className="text-green-600 hover:text-green-800 flex items-center">
                                        Access <ArrowRight className="ml-1 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <p className="text-gray-600 mb-4">All courses are free for life when you apply through algoEvaluator</p>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                                Explore All Courses
                            </button>
                        </div>
                    </div>
                )}

                {/* Application Process Tab Content */}
                {activeTab === 'application' && (
                    <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-700 ease-in-out">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Simple 4-Step Application Process</h2>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-0 md:left-1/2 transform md:translate-x-0 h-full w-1 bg-blue-200"></div>

                            {/* Step 1 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-12">
                                <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">Create Your Profile</h3>
                                    <p className="text-gray-600">Sign up and build your academic profile with your achievements, test scores, and extracurricular activities.</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold z-10 mb-4 md:mb-0 order-1 md:order-2">1</div>
                                <div className="flex-1 md:pl-8 order-3"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-12">
                                <div className="flex-1 md:pr-8 order-2"></div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold z-10 mb-4 md:mb-0 order-1">2</div>
                                <div className="flex-1 md:pl-8 order-3">
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">Discover Matching Colleges</h3>
                                    <p className="text-gray-600">Our AI algorithm will match you with colleges that fit your academic profile and preferences.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-12">
                                <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">Apply Through Our Platform</h3>
                                    <p className="text-gray-600">Complete your applications directly through algoEvaluator with our guided application wizard.</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold z-10 mb-4 md:mb-0 order-1 md:order-2">3</div>
                                <div className="flex-1 md:pl-8 order-3"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative flex flex-col md:flex-row items-center">
                                <div className="flex-1 md:pr-8 order-2"></div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold z-10 mb-4 md:mb-0 order-1">4</div>
                                <div className="flex-1 md:pl-8 order-3">
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">Get Free Course Access</h3>
                                    <p className="text-gray-600">Gain lifetime access to our exclusive admission-related courses to help you succeed.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center mx-auto">
                                Start Your Application <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Testimonials */}
            <div className={`bg-gray-100 py-16 px-6 transition-all duration-1000 ease-in-out ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JD</div>
                                <div className="ml-4">
                                    <h3 className="font-bold">Jason Davis</h3>
                                    <p className="text-sm text-gray-500">MIT, Computer Science</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"algoEvaluator helped me get into my dream school! The free courses were invaluable for my application process."</p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">AL</div>
                                <div className="ml-4">
                                    <h3 className="font-bold">Ava Liu</h3>
                                    <p className="text-sm text-gray-500">Stanford, Data Science</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"The matching algorithm found schools I hadn't even considered that ended up being perfect for my career goals."</p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">MJ</div>
                                <div className="ml-4">
                                    <h3 className="font-bold">Michael Johnson</h3>
                                    <p className="text-sm text-gray-500">Georgia Tech, Robotics</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"The application process was so streamlined. I saved countless hours and got into my top-choice program!"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your College Journey?</h2>
                    <p className="text-xl mb-8">Join thousands of students who found their perfect college match with algoEvaluator</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                            <Zap className="mr-2 h-5 w-5" />
                            Create Account
                        </button>
                        <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                            Explore Colleges
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer with animation */}
            <footer className="bg-gray-900 text-gray-300 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold text-white mb-4">algoEvaluator</h2>
                            <p className="max-w-sm">Connecting students with their ideal colleges and providing free resources for success.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Colleges</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Free Courses</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Application Process</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li>support@algoevaluator.com</li>
                                    <li>1-800-COLLEGE</li>
                                    <li>123 Tech Plaza, Suite 400</li>
                                    <li>San Francisco, CA 94107</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p>&copy; {new Date().getFullYear()} algoEvaluator. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}