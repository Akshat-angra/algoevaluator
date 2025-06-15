// components/careers/ApplicationForm.jsx
"use client";

import { useState } from "react";

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        position: "Senior Frontend Developer", // Default to first position
        resume: null,
        portfolio: "",
        coverLetter: "",
        heardFrom: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            // In a real application, you would send the data to your API endpoint
            // For demonstration purposes, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Form submitted:", formData);
            setFormSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            setFormError("There was a problem submitting your application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (formSubmitted) {
        return (
            <div className="bg-zinc-900 p-8 rounded-lg border border-purple-600/20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                <p className="text-zinc-300 mb-6">
                    Thank you for your interest in joining the AlgoEvaluator team. We've received your application and will be in touch soon.
                </p>
                <p className="text-zinc-400 text-sm">
                    Please check your email for a confirmation of your application.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 p-8 rounded-lg border border-purple-900/20">
            {formError && (
                <div className="bg-red-900/20 border border-red-800 text-red-200 px-4 py-3 rounded mb-6">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 mb-1">
                            Full Name <span className="text-purple-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                            Email Address <span className="text-purple-400">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Position */}
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-zinc-300 mb-1">
                            Position <span className="text-purple-400">*</span>
                        </label>
                        <select
                            id="position"
                            name="position"
                            required
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="Senior Frontend Developer">Senior Frontend Developer</option>
                            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Resume */}
                <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-zinc-300 mb-1">
                        Resume/CV <span className="text-purple-400">*</span>
                    </label>
                    <div className="flex items-center">
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="resume"
                            className="cursor-pointer flex items-center justify-center px-4 py-2 border border-zinc-700 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload File
                        </label>
                        <span className="ml-3 text-sm text-zinc-400">
                            {formData.resume ? formData.resume.name : "PDF, DOC, or DOCX (Max 5MB)"}
                        </span>
                    </div>
                </div>

                {/* Portfolio URL */}
                <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-zinc-300 mb-1">
                        Portfolio/GitHub URL
                    </label>
                    <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Cover Letter */}
                <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-zinc-300 mb-1">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows="4"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us why you'd be a great fit for this role..."
                    ></textarea>
                </div>

                {/* How did you hear about us */}
                <div>
                    <label htmlFor="heardFrom" className="block text-sm font-medium text-zinc-300 mb-1">
                        How did you hear about us?
                    </label>
                    <select
                        id="heardFrom"
                        name="heardFrom"
                        value={formData.heardFrom}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">Please select</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Indeed">Indeed</option>
                        <option value="Company Website">Company Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md transition-all ${isSubmitting
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:from-purple-700 hover:to-purple-900"
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            "Submit Application"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}