"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Search, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert } from "@/components/ui/alert"
import { FooterSection } from "../components/footer/FooterSection"

export default function AssessmentsPage() {
    const [assessments, setAssessments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredAssessments, setFilteredAssessments] = useState([])
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setIsLoading(true)
                setError(null)
                // Simulating an API call
                await new Promise((resolve) => setTimeout(resolve, 1000))
                // Replace this with your actual API call
                // const response = await fetch('/api/assessments')
                // const data = await response.json()
                // setAssessments(data)
                setAssessments([])
            } catch (error) {
                console.error("Error fetching assessments:", error)
                setError("Failed to load assessments. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAssessments()
    }, [])

    useEffect(() => {
        const filtered = assessments.filter(
            (assessment) =>
                assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedDifficulty === "All" || assessment.difficulty === selectedDifficulty),
        )
        setFilteredAssessments(filtered)
    }, [searchTerm, selectedDifficulty, assessments])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                        Assessments
                    </h1>
                    <p className="text-xl text-gray-300">Challenge yourself and improve your algorithmic skills.</p>
                </motion.div>

                {isLoading ? (
                    <Alert variant="info" title="Loading">
                        Fetching available assessments...
                    </Alert>
                ) : error ? (
                    <Alert variant="destructive" title="System Error">
                        <p className="text-sm">We encountered an issue while fetching assessments.</p>
                        <ul className="mt-2 text-xs list-disc list-inside">
                            <li>🔹 Possible API failure</li>
                            <li>🔹 Network connection issues</li>
                            <li>🔹 Internal server error (500)</li>
                        </ul>
                        <p className="mt-2 text-sm">
                            Please try again later or contact support if the issue persists.
                        </p>
                    </Alert>
                ) : assessments.length === 0 ? (
                    <Alert
                        variant="warning"
                        title="Service Status"
                        className="border-l-[3px] border-amber-500 bg-neutral-900 text-gray-100 shadow-2xl rounded-xl p-6 relative isolate transition-all hover:shadow-amber-900/30"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-l from-amber-500/20 to-transparent -z-10 clip-diagonal" />
                        <div className="absolute inset-0 bg-noise-pattern opacity-5 -z-20" />

                        <div className="space-y-4 relative">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 animate-pulse">
                                    <AlertTriangle className="h-6 w-6 text-amber-300" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-amber-300 mb-2">
                                        Service Temporarily Unavailable
                                    </h3>

                                    <div className="space-y-2.5">
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            Our assessment database is currently undergoing scheduled maintenance.
                                            We're working diligently to restore services as quickly as possible.
                                        </p>

                                        <div className="flex items-baseline gap-2 text-sm">
                                            <span className="font-medium text-gray-400">Estimated Resolution:</span>
                                            <span className="font-semibold text-amber-100">11:30 AM - 12:30 PM GMT</span>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-amber-900/50">
                                            <p className="text-xs font-medium text-amber-400 tracking-wide uppercase">
                                                Recommended Action
                                            </p>
                                            <p className="text-sm text-gray-300 mt-1.5">
                                                Please refresh your browser in 30 minutes or check our
                                                <a href="#status" className="text-amber-300 hover:text-amber-200 ml-1.5 underline">
                                                    status page
                                                </a> for real-time updates.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Alert>

                ) : (
                    <>
                        <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="relative flex-grow">
                                <Input
                                    type="text"
                                    placeholder="Search assessments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white">
                                        {selectedDifficulty} <span className="ml-2">▼</span>
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
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <AnimatePresence>
                                {filteredAssessments.map((assessment, index) => (
                                    <motion.div
                                        key={assessment.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Card className="h-full flex flex-col overflow-hidden bg-gray-800 border-gray-700">
                                            <CardHeader className="relative">
                                                <div className="flex items-center justify-between">
                                                    <div className="p-2 bg-blue-500 rounded-full">{assessment.icon}</div>
                                                    <Badge
                                                        variant={
                                                            assessment.difficulty === "Beginner"
                                                                ? "secondary"
                                                                : assessment.difficulty === "Intermediate"
                                                                    ? "default"
                                                                    : "destructive"
                                                        }
                                                    >
                                                        {assessment.difficulty}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="mt-4 text-white">{assessment.title}</CardTitle>
                                                <CardDescription className="text-gray-400">{assessment.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                    <span className="flex items-center">
                                                        <FileText className="mr-1 h-4 w-4" /> {assessment.questions} questions
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="mr-1 h-4 w-4" /> {assessment.timeLimit} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Progress value={assessment.completionRate} className="flex-grow" />
                                                    <span className="text-sm font-medium text-gray-300">{assessment.completionRate}%</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Completion rate</p>
                                            </CardContent>
                                            <CardFooter className="mt-auto">
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                    <a href="/assessments/found">Start Assessment</a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </main>
            <FooterSection />
        </div>
    )
}

