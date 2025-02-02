import React from "react";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewletter";
import { FooterSocial } from "./FooterSocial";
import { Code2 } from "lucide-react";

export function FooterSection() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8">
                    <div className="lg:col-span-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <Code2 className="w-8 h-8 text-blue-500" />
                            <h2 className="text-2xl font-bold text-white">AlgoEvaluator</h2>
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
                            <span className="font-semibold text-white">AlgoHire</span>. All
                            rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
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
