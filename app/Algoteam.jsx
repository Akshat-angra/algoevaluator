"use client";
import { motion } from "framer-motion";
import { GlobeIcon, Linkedin, Twitter, Github, ExternalLink } from "lucide-react";

const teamMembers = [
    {
        name: "Aditya Sharma",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech recruitment and AI.",
        image: "/images/aditya.jpg",
        links: {
            linkedin: "https://linkedin.com/in/aditya",
            twitter: "https://twitter.com/aditya",
            github: "https://github.com/aditya"
        }
    },
    {
        name: "Anandita Mahajan",
        role: "CTO",
        bio: "AI expert specializing in machine learning and recruitment algorithms.",
        image: "https://eccelleroit.com/assets/images/process/develop.png",
        links: {
            linkedin: "https://linkedin.com/in/anandita",
            twitter: "https://twitter.com/anandita",
            github: "https://github.com/anandita"
        }
    },
    {
        name: "Akshat Angra",
        role: "Lead Developer",
        bio: "Full-stack wizard with a passion for elegant code solutions.",
        image: "https://static.vecteezy.com/system/resources/previews/011/153/368/original/3d-website-developer-working-on-laptop-illustration-png.png",
        links: {
            linkedin: "https://linkedin.com/in/akshat",
            twitter: "https://twitter.com/akshat",
            github: "https://github.com/akshat"
        }
    }
];

function Algoteam() {
    return (
        <div className="min-h-screen bg-[#030014] overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/30 rounded-full filter blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4F46E5]/20 rounded-full filter blur-[150px]" />

            <div className="relative container mx-auto px-4 py-24">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        className="flex items-center justify-center mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <GlobeIcon className="w-12 h-12 text-purple-500" />
                    </motion.div>
                    <h2 className="text-6xl font-bold text-white mb-6">
                        Meet Our{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                            Team
                        </span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Pioneering the future of technical interviews with innovation and expertise
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/20 to-indigo-900/20 p-1">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Image Container */}
                                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-purple-400 font-medium mb-3">
                                            {member.role}
                                        </p>
                                        <p className="text-gray-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {member.bio}
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex space-x-4 items-center">
                                            <motion.a
                                                href={member.links.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                className="text-gray-400 hover:text-purple-400 transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a
                                                href={member.links.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                className="text-gray-400 hover:text-purple-400 transition-colors"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a
                                                href={member.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                className="text-gray-400 hover:text-purple-400 transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <a
                        href="/careers"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <span>Join Our Team</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}

export default Algoteam;