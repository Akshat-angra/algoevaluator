// "use client"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { FileText, Search, Clock, AlertTriangle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Alert } from "@/components/ui/alert"
// import { FooterSection } from "../components/footer/FooterSection"

// export default function AssessmentsPage() {
//     const [assessments, setAssessments] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [searchTerm, setSearchTerm] = useState("")
//     const [filteredAssessments, setFilteredAssessments] = useState([])
//     const [selectedDifficulty, setSelectedDifficulty] = useState("All")

//     useEffect(() => {
//         const fetchAssessments = async () => {
//             try {
//                 setIsLoading(true)
//                 setError(null)
//                 // Simulating an API call
//                 await new Promise((resolve) => setTimeout(resolve, 1000))
//                 // Replace this with your actual API call
//                 // const response = await fetch('/api/assessments')
//                 // const data = await response.json()
//                 // setAssessments(data)
//                 setAssessments([])
//             } catch (error) {
//                 console.error("Error fetching assessments:", error)
//                 setError("Failed to load assessments. Please try again later.")
//             } finally {
//                 setIsLoading(false)
//             }
//         }

//         fetchAssessments()
//     }, [])

//     useEffect(() => {
//         const filtered = assessments.filter(
//             (assessment) =>
//                 assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//                 (selectedDifficulty === "All" || assessment.difficulty === selectedDifficulty),
//         )
//         setFilteredAssessments(filtered)
//     }, [searchTerm, selectedDifficulty, assessments])

//     return (
//         <div className="min-h-screen bg-[#05090F] text-gray-200">
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="mb-8"
//                 >
//                     <h1 className="text-4xl font-bold mb-4 bg-[#FF1A75] bg-clip-text text-transparent">
//                         Assessments
//                     </h1>
//                     <p className="text-xl text-gray-300">Challenge yourself and improve your algorithmic skills.</p>
//                 </motion.div>

//                 {isLoading ? (
//                     <Alert variant="info" title="Loading">
//                         Fetching available assessments...
//                     </Alert>
//                 ) : error ? (
//                     <Alert variant="destructive" title="System Error">
//                         <p className="text-sm">We encountered an issue while fetching assessments.</p>
//                         <ul className="mt-2 text-xs list-disc list-inside">
//                             <li>🔹 Possible API failure</li>
//                             <li>🔹 Network connection issues</li>
//                             <li>🔹 Internal server error (500)</li>
//                         </ul>
//                         <p className="mt-2 text-sm">
//                             Please try again later or contact support if the issue persists.
//                         </p>
//                     </Alert>
//                 ) : assessments.length === 0 ? (
//                     <Alert
//                         variant="warning"
//                         title="Service Status"
//                         className="border-l-[3px] border-amber-500 bg-neutral-900 text-gray-100 shadow-2xl rounded-xl p-6 relative isolate transition-all hover:shadow-amber-900/30"
//                     >
//                         <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-l from-amber-500/20 to-transparent -z-10 clip-diagonal" />
//                         <div className="absolute inset-0 bg-noise-pattern opacity-5 -z-20" />

//                         <div className="space-y-4 relative">
//                             <div className="flex items-start gap-3">
//                                 <div className="shrink-0 animate-pulse">
//                                     <AlertTriangle className="h-6 w-6 text-amber-300" />
//                                 </div>

//                                 <div className="flex-1">
//                                     <h3 className="text-xl font-bold text-amber-300 mb-2">
//                                         Service Temporarily Unavailable
//                                     </h3>

//                                     <div className="space-y-2.5">
//                                         <p className="text-base text-gray-200 leading-relaxed">
//                                             Our assessment database is currently undergoing scheduled maintenance.
//                                             We're working diligently to restore services as quickly as possible.
//                                         </p>

//                                         <div className="flex items-baseline gap-2 text-sm">
//                                             <span className="font-medium text-gray-400">Estimated Resolution:</span>
//                                             <span className="font-semibold text-amber-100">11:30 AM - 12:30 PM GMT</span>
//                                         </div>

//                                         <div className="mt-3 pt-3 border-t border-amber-900/50">
//                                             <p className="text-xs font-medium text-amber-400 tracking-wide uppercase">
//                                                 Recommended Action
//                                             </p>
//                                             <p className="text-sm text-gray-300 mt-1.5">
//                                                 Please refresh your browser in 30 minutes or check our
//                                                 <a href="#status" className="text-amber-300 hover:text-amber-200 ml-1.5 underline">
//                                                     status page
//                                                 </a> for real-time updates.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Alert>

//                 ) : (
//                     <>
//                         <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                             <div className="relative flex-grow">
//                                 <Input
//                                     type="text"
//                                     placeholder="Search assessments..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="pl-10 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
//                                 />
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             </div>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="outline" className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white">
//                                         {selectedDifficulty} <span className="ml-2">▼</span>
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent className="bg-gray-800 border-gray-700">
//                                     {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
//                                         <DropdownMenuItem
//                                             key={difficulty}
//                                             onSelect={() => setSelectedDifficulty(difficulty)}
//                                             className="text-gray-200 focus:bg-gray-700 focus:text-white"
//                                         >
//                                             {difficulty}
//                                         </DropdownMenuItem>
//                                     ))}
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </div>

//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.5 }}
//                             className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//                         >
//                             <AnimatePresence>
//                                 {filteredAssessments.map((assessment, index) => (
//                                     <motion.div
//                                         key={assessment.id}
//                                         initial={{ opacity: 0, scale: 0.9 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         exit={{ opacity: 0, scale: 0.9 }}
//                                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                                         whileHover={{ scale: 1.03 }}
//                                         whileTap={{ scale: 0.98 }}
//                                     >
//                                         <Card className="h-full flex flex-col overflow-hidden bg-gray-800 border-gray-700">
//                                             <CardHeader className="relative">
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="p-2 bg-blue-500 rounded-full">{assessment.icon}</div>
//                                                     <Badge
//                                                         variant={
//                                                             assessment.difficulty === "Beginner"
//                                                                 ? "secondary"
//                                                                 : assessment.difficulty === "Intermediate"
//                                                                     ? "default"
//                                                                     : "destructive"
//                                                         }
//                                                     >
//                                                         {assessment.difficulty}
//                                                     </Badge>
//                                                 </div>
//                                                 <CardTitle className="mt-4 text-white">{assessment.title}</CardTitle>
//                                                 <CardDescription className="text-gray-400">{assessment.description}</CardDescription>
//                                             </CardHeader>
//                                             <CardContent>
//                                                 <div className="flex justify-between text-sm text-gray-400 mb-2">
//                                                     <span className="flex items-center">
//                                                         <FileText className="mr-1 h-4 w-4" /> {assessment.questions} questions
//                                                     </span>
//                                                     <span className="flex items-center">
//                                                         <Clock className="mr-1 h-4 w-4" /> {assessment.timeLimit} minutes
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <Progress value={assessment.completionRate} className="flex-grow" />
//                                                     <span className="text-sm font-medium text-gray-300">{assessment.completionRate}%</span>
//                                                 </div>
//                                                 <p className="text-xs text-gray-500 mt-1">Completion rate</p>
//                                             </CardContent>
//                                             <CardFooter className="mt-auto">
//                                                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                                                     <a href="/assessments/found">Start Assessment</a>
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </motion.div>
//                                 ))}
//                             </AnimatePresence>
//                         </motion.div>
//                     </>
//                 )}
//             </main>
//             <div className="flex items-center my-8 w-full">
//                 <div className="flex-grow h-px bg-gradient-to-r from-cyan-300 via-indigo-500 to-purple-600"></div>
//                 <div className="flex-shrink-0 mx-4">
//                     <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse"></div>
//                 </div>
//                 <div className="flex-grow h-px bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-300"></div>
//             </div>
//             <FooterSection />
//         </div>
//     )
// }



'use client';

"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Search, Clock, AlertTriangle, Building, Award, BarChart2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { FooterSection } from "../components/footer/FooterSection"
import Image from "next/image"
import Link from "next/link"

export default function AssessmentsPage() {
    const [assessments, setAssessments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredAssessments, setFilteredAssessments] = useState([])
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedCompany, setSelectedCompany] = useState("All")
    const [activeTab, setActiveTab] = useState("all")
    const [userProgress, setUserProgress] = useState({})

    // Sample company filters
    const companies = ["All", "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix"]

    // Sample categories
    const categories = ["All", "Algorithms", "Data Structures", "System Design", "Frontend", "Backend", "Database", "DevOps"]

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setIsLoading(true)
                setError(null)

                // Construct query parameters
                const params = new URLSearchParams()
                if (searchTerm) params.append('search', searchTerm)
                if (selectedDifficulty !== "All") params.append('difficulty', selectedDifficulty)
                if (selectedCompany !== "All") params.append('company', selectedCompany)
                if (selectedCategory !== "All") params.append('category', selectedCategory)

                const response = await fetch(`/api/assessments?${params.toString()}`)

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`)
                }

                const result = await response.json()

                if (result.success) {
                    setAssessments(result.data)
                    setFilteredAssessments(result.data)
                } else {
                    throw new Error(result.message || 'Failed to fetch assessments')
                }

                // Also fetch user progress if user is logged in
                try {
                    const userResponse = await fetch('/api/user-assessments')
                    if (userResponse.ok) {
                        const userResult = await userResponse.json()
                        if (userResult.success) {
                            // Create a map of assessment ID to user progress
                            const progressMap = {}
                            userResult.data.forEach(item => {
                                progressMap[item.assessmentId._id] = item
                            })
                            setUserProgress(progressMap)
                        }
                    }
                } catch (userError) {
                    console.error("Error fetching user progress:", userError)
                    // Non-critical error, don't set the main error state
                }

            } catch (error) {
                console.error("Error fetching assessments:", error)
                setError(error.message || "Failed to load assessments. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAssessments()
    }, [searchTerm, selectedDifficulty, selectedCompany, selectedCategory, activeTab])

    // For demonstration, let's populate with sample data if none is loaded yet
    useEffect(() => {
        if (!isLoading && assessments.length === 0 && !error) {
            // Sample data for demonstration
            const sampleAssessments = [
                {
                    _id: "1",
                    title: "Binary Search Implementation",
                    description: "Test your understanding of binary search algorithm with practical challenges.",
                    company: "Google",
                    companyLogo: "/images/google.png",
                    difficulty: "Intermediate",
                    questions: 12,
                    timeLimit: 45,
                    completionRate: 68,
                    category: "Algorithms",
                    tags: ["searching", "algorithms", "interview"],
                    attempts: 1243
                },
                {
                    _id: "2",
                    title: "React Component Architecture",
                    description: "Evaluate your understanding of React component design patterns and best practices.",
                    company: "Meta",
                    companyLogo: "/images/meta.png",
                    difficulty: "Advanced",
                    questions: 15,
                    timeLimit: 60,
                    completionRate: 52,
                    category: "Frontend",
                    tags: ["react", "frontend", "components"],
                    attempts: 895
                },
                {
                    _id: "3",
                    title: "Database Schema Design",
                    description: "Create efficient database schemas for various business scenarios.",
                    company: "Amazon",
                    companyLogo: "/images/amazon.png",
                    difficulty: "Beginner",
                    questions: 8,
                    timeLimit: 30,
                    completionRate: 81,
                    category: "Database",
                    tags: ["SQL", "schema", "normalization"],
                    attempts: 1578
                },
                {
                    _id: "4",
                    title: "Distributed Systems Architecture",
                    description: "Test your knowledge of distributed systems design and implementation.",
                    company: "Microsoft",
                    companyLogo: "/images/microsoft.png",
                    difficulty: "Advanced",
                    questions: 20,
                    timeLimit: 90,
                    completionRate: 42,
                    category: "System Design",
                    tags: ["microservices", "scalability", "consistency"],
                    attempts: 623
                },
                {
                    _id: "5",
                    title: "Dynamic Programming Fundamentals",
                    description: "Master the basics of dynamic programming with step-by-step problems.",
                    company: "Apple",
                    companyLogo: "/images/apple.png",
                    difficulty: "Intermediate",
                    questions: 10,
                    timeLimit: 60,
                    completionRate: 59,
                    category: "Algorithms",
                    tags: ["dp", "optimization", "algorithms"],
                    attempts: 1089
                },
                {
                    _id: "6",
                    title: "Container Orchestration with Kubernetes",
                    description: "Demonstrate your knowledge of Kubernetes and container orchestration.",
                    company: "Netflix",
                    companyLogo: "/images/netflix.png",
                    difficulty: "Advanced",
                    questions: 15,
                    timeLimit: 75,
                    completionRate: 47,
                    category: "DevOps",
                    tags: ["kubernetes", "containers", "devops"],
                    attempts: 782
                }
            ];

            setAssessments(sampleAssessments);
            setFilteredAssessments(sampleAssessments);
        }
    }, [isLoading, assessments.length, error]);

    // Filter based on active tab
    useEffect(() => {
        if (activeTab === "all") {
            setFilteredAssessments(assessments);
        } else if (activeTab === "inProgress") {
            const inProgress = assessments.filter(assessment =>
                userProgress[assessment._id] && userProgress[assessment._id].status === "in_progress"
            );
            setFilteredAssessments(inProgress);
        } else if (activeTab === "completed") {
            const completed = assessments.filter(assessment =>
                userProgress[assessment._id] && userProgress[assessment._id].status === "completed"
            );
            setFilteredAssessments(completed);
        }
    }, [assessments, activeTab, userProgress]);

    const startAssessment = async (assessmentId) => {
        try {
            const response = await fetch('/api/user-assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assessmentId }),
            });

            if (response.ok) {
                window.location.href = `/assessments/${assessmentId}/start`;
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to start assessment');
            }
        } catch (error) {
            console.error('Error starting assessment:', error);
            alert('Failed to start assessment: ' + error.message);
        }
    };

    // Helper function to render difficulty badge
    const renderDifficultyBadge = (difficulty) => {
        let variant = "default";
        if (difficulty === "Beginner") variant = "secondary";
        else if (difficulty === "Intermediate") variant = "default";
        else if (difficulty === "Advanced") variant = "destructive";

        return <Badge variant={variant}>{difficulty}</Badge>;
    };

    // Helper function to get company logo placeholder
    const getCompanyInitial = (company) => {
        return company.charAt(0).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#05090F] text-gray-200">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF1A75] to-[#7000FF] bg-clip-text text-transparent">
                        Technical Assessments
                    </h1>
                    <p className="text-xl text-gray-300">Challenge yourself with company-specific technical assessments and improve your skills.</p>
                </motion.div>

                <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-800 mb-6">
                        <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All Assessments</TabsTrigger>
                        <TabsTrigger value="inProgress" className="data-[state=active]:bg-gray-700">In Progress</TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-gray-700">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>

                {isLoading ? (
                    <Alert variant="default" className="bg-blue-900/20 border-blue-500 text-blue-200">
                        <div className="flex items-center">
                            <div className="w-6 h-6 mr-2 border-2 border-t-blue-400 border-r-blue-400 border-b-blue-400 border-l-transparent rounded-full animate-spin"></div>
                            <AlertTitle>Loading</AlertTitle>
                        </div>
                        <AlertDescription>
                            Fetching available assessments from our database...
                        </AlertDescription>
                    </Alert>
                ) : error ? (
                    <Alert variant="destructive" className="bg-red-900/20 border-red-500 text-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                        <AlertTitle className="text-red-100">System Error</AlertTitle>
                        <AlertDescription>
                            <p className="text-sm">We encountered an issue while fetching assessments: {error}</p>
                            <ul className="mt-2 text-xs list-disc list-inside">
                                <li>🔹 Possible API failure</li>
                                <li>🔹 Network connection issues</li>
                                <li>🔹 Database connection error</li>
                            </ul>
                            <p className="mt-2 text-sm">
                                Please try again later or contact support if the issue persists.
                            </p>
                        </AlertDescription>
                    </Alert>
                ) : filteredAssessments.length === 0 ? (
                    <Alert
                        variant="warning"
                        className="border-l-[3px] border-amber-500 bg-neutral-900 text-gray-100 shadow-2xl rounded-xl p-6 relative isolate transition-all hover:shadow-amber-900/30"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-l from-amber-500/20 to-transparent -z-10 clip-diagonal" />
                        <div className="absolute inset-0 bg-noise-pattern opacity-5 -z-20" />

                        <div className="space-y-4 relative">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0">
                                    <AlertTriangle className="h-6 w-6 text-amber-300" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-amber-300 mb-2">
                                        No Assessments Found
                                    </h3>

                                    <div className="space-y-2.5">
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            {activeTab === "all"
                                                ? "No assessments match your current search criteria."
                                                : activeTab === "inProgress"
                                                    ? "You don't have any assessments in progress."
                                                    : "You haven't completed any assessments yet."}
                                        </p>

                                        <div className="mt-3 pt-3 border-t border-amber-900/50">
                                            <p className="text-xs font-medium text-amber-400 tracking-wide uppercase">
                                                Recommended Action
                                            </p>
                                            <p className="text-sm text-gray-300 mt-1.5">
                                                {activeTab === "all"
                                                    ? "Try adjusting your filters or search terms to see more results."
                                                    : activeTab === "inProgress"
                                                        ? "Start a new assessment from the 'All Assessments' tab."
                                                        : "Complete an assessment to see it listed here."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Alert>
                ) : (
                    <>
                        <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-5 lg:col-span-6 relative">
                                <Input
                                    type="text"
                                    placeholder="Search assessments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <div className="md:col-span-7 lg:col-span-6 grid grid-cols-3 gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-white">
                                            <Building className="w-4 h-4 mr-2" /> {selectedCompany}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                        {companies.map((company) => (
                                            <DropdownMenuItem
                                                key={company}
                                                onSelect={() => setSelectedCompany(company)}
                                                className="text-gray-200 focus:bg-gray-700 focus:text-white"
                                            >
                                                {company}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-white">
                                            <Filter className="w-4 h-4 mr-2" /> {selectedDifficulty}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                        {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                                            <DropdownMenuItem
                                                key={difficulty}
                                                onSelect={() => setSelectedDifficulty(difficulty)}
                                                className="text-gray-200 focus:bg-gray-700 focus:text-white"
                                            >
                                                {difficulty}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-white">
                                            <BarChart2 className="w-4 h-4 mr-2" /> {selectedCategory}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                        {categories.map((category) => (
                                            <DropdownMenuItem
                                                key={category}
                                                onSelect={() => setSelectedCategory(category)}
                                                className="text-gray-200 focus:bg-gray-700 focus:text-white"
                                            >
                                                {category}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <AnimatePresence>
                                {filteredAssessments.map((assessment, index) => {
                                    const userAssessment = userProgress[assessment._id];
                                    const isCompleted = userAssessment?.status === "completed";
                                    const isInProgress = userAssessment?.status === "in_progress";

                                    return (
                                        <motion.div
                                            key={assessment._id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Card className="h-full flex flex-col overflow-hidden bg-gray-800/80 border-gray-700 backdrop-blur-sm shadow-xl">
                                                <CardHeader className="relative">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <Avatar className="h-9 w-9 bg-primary/20 text-white border border-gray-700">
                                                                {assessment.companyLogo ? (
                                                                    <Image
                                                                        src={assessment.companyLogo}
                                                                        alt={assessment.company}
                                                                        width={36}
                                                                        height={36}
                                                                        className="object-contain"
                                                                    />
                                                                ) : (
                                                                    <span>{getCompanyInitial(assessment.company)}</span>
                                                                )}
                                                            </Avatar>
                                                            <span className="ml-2 text-sm font-medium text-gray-300">{assessment.company}</span>
                                                        </div>
                                                        {renderDifficultyBadge(assessment.difficulty)}
                                                    </div>
                                                    <CardTitle className="text-lg text-white">{assessment.title}</CardTitle>
                                                    <CardDescription className="text-gray-400 line-clamp-2">{assessment.description}</CardDescription>

                                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                                        {assessment.category && (
                                                            <Badge variant="outline" className="text-xs bg-gray-700/50 border-gray-600 text-gray-300">
                                                                {assessment.category}
                                                            </Badge>
                                                        )}
                                                        {assessment.tags?.slice(0, 2).map(tag => (
                                                            <Badge key={tag} variant="outline" className="text-xs bg-gray-700/50 border-gray-600 text-gray-300">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-3">
                                                        <span className="flex items-center">
                                                            <FileText className="mr-1.5 h-4 w-4 text-indigo-400" /> {assessment.questions} questions
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="mr-1.5 h-4 w-4 text-indigo-400" /> {assessment.timeLimit} minutes
                                                        </span>
                                                    </div>

                                                    {isCompleted ? (
                                                        <div className="mb-2 mt-4">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-sm font-medium text-gray-300">Your Score</span>
                                                                <span className="text-sm font-semibold text-emerald-400">{userAssessment.score}%</span>
                                                            </div>
                                                            <Progress
                                                                value={userAssessment.score}
                                                                className="h-2"
                                                                indicatorClassName={
                                                                    userAssessment.score >= 80 ? "bg-emerald-500" :
                                                                        userAssessment.score >= 60 ? "bg-amber-500" :
                                                                            "bg-red-500"
                                                                }
                                                            />
                                                            <div className="flex justify-center mt-2">
                                                                <Badge className="bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/40 flex items-center gap-1">
                                                                    <Award className="h-3 w-3" /> Completed
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="mb-2">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-sm font-medium text-gray-300">Completion Rate</span>
                                                                <span className="text-sm text-gray-400">{assessment.completionRate}%</span>
                                                            </div>
                                                            <Progress value={assessment.completionRate} className="h-2" />
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                                                                <span>{assessment.attempts?.toLocaleString()} attempts</span>
                                                                {isInProgress && (
                                                                    <Badge variant="outline" className="text-xs bg-blue-900/30 text-blue-300 border-blue-700">
                                                                        In Progress
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardFooter className="mt-auto pt-2">
                                                    {isCompleted ? (
                                                        <div className="grid grid-cols-2 gap-3 w-full">
                                                            <Button variant="outline" className="w-full bg-gray-700 hover:bg-gray-600 text-white border-0">
                                                                Review
                                                            </Button>
                                                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                                                                Retry
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            onClick={() => startAssessment(assessment._id)}
                                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                                        >
                                                            {isInProgress ? "Continue Assessment" : "Start Assessment"}
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </main>
            <div className="flex items-center my-8 w-full">
                <div className="flex-grow h-px bg-gradient-to-r from-cyan-300 via-indigo-500 to-purple-600"></div>
                <div className="flex-shrink-0 mx-4">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse"></div>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-300"></div>
            </div>
            <FooterSection />
        </div>
    )
}