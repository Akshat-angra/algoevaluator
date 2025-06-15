"use client";

import { useState, useEffect } from 'react';

export default function TermsOfServiceModal({ isOpen, onClose }) {
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [isOpen, onClose]);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="relative bg-white max-w-3xl w-full max-h-[90vh] rounded-lg shadow-xl overflow-hidden"
                style={{ maxWidth: '800px' }}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <h2 className="text-xl font-medium text-gray-900">Terms of Service</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    <div className="prose max-w-none prose-headings:text-blue-600 prose-a:text-blue-600">
                        <h3 className="text-xl font-medium text-gray-900">AlgoEvaluator Terms of Service</h3>
                        <p className="text-gray-500">Last updated: April 15, 2025</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">1. Acceptance of Terms</h4>
                        <p className="text-gray-700">By accessing or using AlgoEvaluator services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">2. Description of Service</h4>
                        <p className="text-gray-700">AlgoEvaluator provides tools and services for algorithm evaluation, optimization, and analysis. Our platform offers various features including performance benchmarking, complexity analysis, and optimization recommendations.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">3. User Accounts</h4>
                        <p className="text-gray-700">To access certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">4. User Content</h4>
                        <p className="text-gray-700">You retain all rights to any content you submit, post or display on or through the Service. By submitting content to AlgoEvaluator, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing and improving the Service.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">5. Intellectual Property</h4>
                        <p className="text-gray-700">The Service and its original content, features, and functionality are owned by AlgoEvaluator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">6. Privacy Policy</h4>
                        <p className="text-gray-700">Our Privacy Policy describes how we handle the information you provide to us when you use our Service. By using AlgoEvaluator, you agree to our collection and use of information in accordance with our Privacy Policy.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">7. Subscription and Payments</h4>
                        <p className="text-gray-700">Some aspects of the Service may be available on a subscription basis. Subscription fees are non-refundable except as required by law or as explicitly stated in our refund policy.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">8. Termination</h4>
                        <p className="text-gray-700">We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to a breach of the Terms.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">9. Limitation of Liability</h4>
                        <p className="text-gray-700">In no event shall AlgoEvaluator, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">10. Changes to Terms</h4>
                        <p className="text-gray-700">We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">11. Governing Law</h4>
                        <p className="text-gray-700">These Terms shall be governed by and defined following the laws of [Your Jurisdiction]. AlgoEvaluator and yourself irrevocably consent to the exclusive jurisdiction and venue of the courts in [Your Jurisdiction] for any disputes arising from these Terms or your use of the Service.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">12. Contact Us</h4>
                        <p className="text-gray-700">If you have any questions about these Terms, please contact us at legal@algoevaluator.com</p>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md transition-all hover:bg-gray-300"
                        >
                            Decline
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md transition-all hover:bg-blue-700"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}