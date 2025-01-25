import React from "react";
import { GlobeIcon } from "lucide-react";

const teamMembers = [
    {
        name: "Aditya Sharma",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech recruitment and AI.",
        image: "/images/aditya.jpg",
    },
    {
        name: "Anandita Mahajan",
        role: "CTO",
        bio: "AI expert specializing in machine learning and recruitment algorithms.",
        image: "https://eccelleroit.com/assets/images/process/develop.png",
    },
    {
        name: "Akshat Angra",
        role: "Lead Developer",
        bio: "Full-stack wizard with a passion for elegant code solutions.",
        image: "https://static.vecteezy.com/system/resources/previews/011/153/368/original/3d-website-developer-working-on-laptop-illustration-png.png",
    },
];

function Algoteam() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950 overflow-hidden relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    
            <div className="relative">
                <div className="container mx-auto px-4 py-24">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center mb-6">
                            <GlobeIcon className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                            Meet the{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                                Innovators
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Our team of visionaries and experts is dedicated to
                            revolutionizing the tech hiring landscape through innovation and
                            excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-indigo-500/50 transition-colors duration-300"
                            >
                                <div className="aspect-w-3 aspect-h-4 relative">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-indigo-400 font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-300 mb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {member.bio}
                                    </p>
                                    <div className="flex space-x-4 items-center">
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Algoteam;
