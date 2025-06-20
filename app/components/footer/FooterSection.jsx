'use client';
import React, { useState } from "react";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewletter";
import { FooterSocial } from "./FooterSocial";
import { Code2 } from "lucide-react";
import Link from "next/link";
import TermsOfServiceModal from "../TermsOfServiceModal";
import PrivacyPolicyModal from "../privacy";

export function FooterSection() {
    const currentYear = new Date().getFullYear();
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <footer className="bg-black text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8">
                    <div className="lg:col-span-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <Code2 className="w-8 h-8 text-blue-500" />
                            <Link href="/">
                                <h2 className="text-2xl font-bold text-white">AlgoEvaluator</h2></Link>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Revolutionizing technical interviews with AI-powered assessments
                            for accurate and efficient hiring decisions.
                        </p>
                        <FooterSocial />
                    </div>

                    <div className="lg:col-span-5">
                        <FooterLinks />
                    </div>

                    <div className="lg:col-span-3">
                        <FooterNewsletter />
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            <span className="text-blue-400">&copy;</span> {currentYear}{" "}
                            <span className="font-semibold text-white">AlgoEvaluator</span>. All
                            rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPrivacy(true);
                                }}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                            <PrivacyPolicyModal
                                isOpen={showPrivacy}
                                onClose={() => setShowPrivacy(false)}
                            />
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowTermsModal(true);
                                }}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
                            <TermsOfServiceModal
                                isOpen={showTermsModal}
                                onClose={() => setShowTermsModal(false)}
                            />
                            <a
                                href="https://akshatangra.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 font-semibold hover:text-blue-500 transition-colors duration-200"
                            >
                                Akshat's Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
