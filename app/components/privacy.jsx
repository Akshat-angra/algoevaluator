"use client";

import { useEffect } from "react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
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
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white max-w-3xl w-full max-h-[90vh] rounded-lg shadow-xl overflow-hidden" style={{ maxWidth: '800px' }}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-900">Privacy Policy</h2>
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
                        <h3 className="text-xl font-medium text-gray-900">AlgoEvaluator Privacy Policy</h3>
                        <p className="text-gray-500">Last updated: April 15, 2025</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">1. Introduction</h4>
                        <p className="text-gray-700">This Privacy Policy explains how AlgoEvaluator ("we", "our", or "us") collects, uses, discloses, and safeguards your information when you use our platform. Your privacy is important to us, and we are committed to protecting your personal data.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">2. Information We Collect</h4>
                        <p className="text-gray-700">We collect personal information such as your name, email address, and account activity when you sign up, interact with our platform, or communicate with us. We may also collect technical information like IP address, browser type, and usage behavior through cookies and similar technologies.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">3. How We Use Your Information</h4>
                        <p className="text-gray-700">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Provide, operate, and maintain our services</li>
                            <li>Improve, personalize, and expand our services</li>
                            <li>Communicate with you, including support and marketing</li>
                            <li>Ensure the security and integrity of our platform</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">4. Sharing Your Information</h4>
                        <p className="text-gray-700">We do not sell or rent your personal data. We may share your information with trusted third-party service providers that assist in operating our platform, under strict confidentiality agreements. We may also disclose your data if required by law or to protect our legal rights.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">5. Cookies and Tracking Technologies</h4>
                        <p className="text-gray-700">We use cookies and similar tracking technologies to enhance your experience, understand usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">6. Data Security</h4>
                        <p className="text-gray-700">We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">7. Your Rights</h4>
                        <p className="text-gray-700">You have the right to access, correct, or delete your personal information. You may also object to certain processing or request data portability. Contact us at <a href="mailto:privacy@algoevaluator.com">privacy@algoevaluator.com</a> for any privacy-related requests.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">8. Children's Privacy</h4>
                        <p className="text-gray-700">AlgoEvaluator is not intended for use by children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">9. Changes to This Policy</h4>
                        <p className="text-gray-700">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the service after changes implies your consent to the revised policy.</p>

                        <h4 className="text-lg font-medium text-gray-900 mt-6">10. Contact Us</h4>
                        <p className="text-gray-700">For questions about this Privacy Policy, contact us at <a href="mailto:privacy@algoevaluator.com">privacy@algoevaluator.com</a>.</p>
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
