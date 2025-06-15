// components/careers/ApplicationForm.jsx
"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ApplicationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        position: "",
        experience: "",
        skills: [],
        resume: "",
        coverLetter: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (e) => {
        const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
        setFormData((prev) => ({ ...prev, skills: skillsArray }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Application Submitted", {
                    description: "Thank you for your interest! We'll be in touch soon.",
                });

                // Reset form
                setFormData({
                    fullName: "",
                    email: "",
                    position: "",
                    experience: "",
                    skills: [],
                    resume: "",
                    coverLetter: ""
                });
            } else {
                toast.error("Submission Failed", {
                    description: data.message || "Please try again later.",
                });
            }
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {/* Full Name */}
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        placeholder="John Doe"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Position */}
                <div>
                    <label
                        htmlFor="position"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Position *
                    </label>
                    <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    >
                        <option value="" disabled>Select a position</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="ML Engineer">ML Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Experience */}
                <div>
                    <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Years of Experience *
                    </label>
                    <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    >
                        <option value="" disabled>Select years of experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                    </select>
                </div>

                {/* Skills */}
                <div>
                    <label
                        htmlFor="skills"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Skills (comma separated) *
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        placeholder="JavaScript, React, Node.js, ..."
                    />
                    <p className="mt-1 text-xs text-zinc-500">List your key skills separated by commas</p>
                </div>

                {/* Resume */}
                <div>
                    <label
                        htmlFor="resume"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Resume URL *
                    </label>
                    <input
                        type="url"
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        placeholder="https://drive.google.com/your-resume"
                    />
                    <p className="mt-1 text-xs text-zinc-500">Link to your resume on Google Drive, Dropbox, etc.</p>
                </div>

                {/* Cover Letter */}
                <div>
                    <label
                        htmlFor="coverLetter"
                        className="block text-sm font-medium text-purple-300 mb-1"
                    >
                        Why you're interested (optional)
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                        placeholder="Tell us why you're interested in working at AlgoEvaluator..."
                    ></textarea>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-70 flex items-center justify-center"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                    </>
                ) : (
                    "Submit Application"
                )}
            </button>
        </form>
    );
};