import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Briefcase, GraduationCap, ServerCrash } from 'lucide-react';

export default function ResumePreview() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await fetch("/api/resume");
                const result = await response.json();

                if (response.ok) {
                    setResumes(result.data);
                } else {
                    throw new Error(result.message || "Failed to fetch resumes");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const downloadResume = async (id, name) => {
        try {
            const res = await fetch(`/api/resume/${id}`);
            if (!res.ok) {
                throw new Error("Failed to generate PDF");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${name}-resume.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading resume:", error);
            alert("Failed to download resume.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg">
                <FileText size={64} className="animate-pulse text-blue-400 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-200 animate-pulse">
                    Generating Resumes...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="bg-red-950/30 border-red-800 text-red-300 m-8">
                <CardHeader className="flex flex-row items-center space-x-2">
                    <ServerCrash className="text-red-500" size={24} />
                    <CardTitle className="text-red-300">Resume Generation Error.</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-200">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen p-8 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Generated Resumes
                    </h1>
                    <Badge
                        variant="secondary"
                        className="text-xl bg-gray-800 text-blue-300 border-blue-700 px-4 py-2"
                    >
                        Total: {resumes.length}
                    </Badge>
                </div>

                {resumes.length === 0 ? (
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="text-center text-gray-400 p-6">
                            No resumes generated yet
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <Card
                                key={resume._id}
                                className="bg-gray-800 border-gray-700 hover:border-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="flex items-center text-blue-300">
                                            <FileText className="mr-2" /> {resume.name}
                                        </CardTitle>
                                        <Badge variant="outline" className="text-green-400 border-green-600">
                                            Active
                                        </Badge>
                                    </div>
                                    <p className="text-gray-400">{resume.email}</p>
                                </CardHeader>
                                <CardContent>
                                    {/* Summary Section */}
                                    <section className="mb-4">
                                        <h2 className="text-lg font-semibold mb-2 text-blue-200">Summary</h2>
                                        <p className="text-gray-300">{resume.summary}</p>
                                    </section>

                                    {/* Work Experience Section */}
                                    <section className="mb-4">
                                        <h2 className="text-lg font-semibold mb-2 flex items-center text-blue-200">
                                            <Briefcase className="mr-2" /> Work Experience
                                        </h2>
                                        {resume.work_experience.length > 0 ? (
                                            <ul className="space-y-2">
                                                {resume.work_experience.map((job, index) => (
                                                    <li
                                                        key={index}
                                                        className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-700/50"
                                                    >
                                                        <div className="font-medium text-white">{job.title} at {job.company}</div>
                                                        <div className="text-sm text-gray-400">({job.years})</div>
                                                        {job.description && (
                                                            <p className="text-sm text-gray-300 mt-1">{job.description}</p>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No experience listed.</p>
                                        )}
                                    </section>

                                    {/* Education Section */}
                                    <section>
                                        <h2 className="text-lg font-semibold mb-2 flex items-center text-blue-200">
                                            <GraduationCap className="mr-2" /> Education
                                        </h2>
                                        {resume.education.length > 0 ? (
                                            <ul className="space-y-2">
                                                {resume.education.map((edu, index) => (
                                                    <li
                                                        key={index}
                                                        className="border-l-4 border-green-500 pl-3 py-2 bg-gray-700/50"
                                                    >
                                                        <div className="font-medium text-white">{edu.degree}</div>
                                                        <div className="text-sm text-gray-400">
                                                            {edu.institution} ({edu.year})
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No education listed.</p>
                                        )}
                                    </section>

                                    {/* Download Button */}
                                    <div className="mt-4">
                                        <button
                                            onClick={() => downloadResume(resume._id, resume.name)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg 
                                            transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                                        >
                                            <Download className="mr-2" /> Download PDF
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}