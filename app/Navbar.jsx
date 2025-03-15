// "use client";
// import { Quicksand } from "next/font/google";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//     Menu,
//     Code2,
//     Brain,
//     BookCheck,
//     LogIn,
//     MessageCircle,
//     Terminal,
//     FileCode,
//     X,
//     ArrowUp,
//     AlertCircle,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import * as Dialog from "@radix-ui/react-dialog";
// import { useUser, UserButton } from "@clerk/clerk-react";

// const quick = Quicksand({
//     subsets: ["latin"],
//     weight: ["500", "700"]
// });

// const routes = [
//     {
//         label: "Practice",
//         icon: FileCode,
//         href: "/practice",
//     },
//     {
//         label: "AI Interview",
//         icon: Brain,
//         href: "/interview",
//     },
//     {
//         label: "Assessments",
//         icon: BookCheck,
//         href: "/assessments",
//     },
//     {
//         label: "Editor",
//         icon: Terminal,
//         href: "/editor",
//     },
//     {
//         label: "Chat",
//         icon: MessageCircle,
//         href: "/chat",
//     },
// ];

// export function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showNotification, setShowNotification] = useState(true);
//     const { isLoaded, user } = useUser();
//     const [showScrollTop, setShowScrollTop] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setShowScrollTop(window.scrollY > 300);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <>
//             {showNotification && (
//                 <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-violet-500 text-white p-1 shadow-lg">
//                     <AlertCircle className="flex-shrink-0" size={20} />
//                     <span className="flex-1 text-center">
//                         We're still cooking our service. Sorry for any inconvenience.
//                     </span>
//                     <button
//                         className="text-black"
//                         onClick={() => setShowNotification(false)}
//                     >
//                         <X size={20} className="text-white hover:bg-gray-200/20" />
//                     </button>
//                 </div>
//             )}
//             <nav className="w-full bg-[#0a0a0a] backdrop-blur supports-[backdrop-filter]:bg-black/100 z-10">
//                 <div className="flex h-16 items-center justify-between px-20 w-full">
//                     <Link href="/" className={`flex items-center gap-2 ${quick.className}`}>
//                         <Code2 className="h-8 w-8 text-blue-400" />
//                         <span className="text-xl font-bold tracking-tight text-white">
//                             Algo<span className="text-blue-400">Evaluator</span>{" "}
//                             <span
//                                 className="text-xs absolute border-none text-white bg-blue-400 border-2 ml-1 px-2 py-0.5 rounded-lg">
//                                 Beta
//                             </span>
//                         </span>
//                     </Link>
//                     <div className="hidden md:flex flex-1 justify-between items-center px-20 ml-32">
//                         <div className="flex gap-6">
//                             {routes.map((route) => (
//                                 <Link
//                                     key={route.href}
//                                     href={route.href}
//                                     className={cn(
//                                         "flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-300",
//                                         "text-white"
//                                     )}
//                                 >
//                                     <route.icon className="h-4 w-4" />
//                                     {route.label}
//                                 </Link>
//                             ))}
//                         </div>
//                         <div className="flex items-center gap-4">
//                             {!isLoaded ? (
//                                 <span>Loading...</span>
//                             ) : user ? (
//                                 <div className="flex gap-4">
//                                     <Button
//                                         variant="ghost"
//                                         className="text-white border-blue-400 border-2 hover:border-none"
//                                         asChild
//                                     >
//                                         <Link href="/dashboard" className="text-white">
//                                             Dashboard
//                                         </Link>
//                                     </Button>
//                                     <UserButton />
//                                 </div>
//                             ) : (
//                                 <div className="flex gap-4">
//                                     <Button
//                                         variant="ghost"
//                                         className="text-white hover:text-blue-500"
//                                         asChild
//                                     >
//                                         <Link href="/sign-in">
//                                             <LogIn className="mr-2 h-4 w-4 text-blue-500" />
//                                             Login
//                                         </Link>
//                                     </Button>
//                                     <Button
//                                         className="bg-blue-400 text-white hover:bg-blue-500"
//                                         asChild
//                                     >
//                                         <Link href="/sign-up">Sign up</Link>
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex flex-1 justify-end md:hidden">
//                         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                             <SheetTrigger asChild>
//                                 <Button
//                                     variant="ghost"
//                                     className="text-blue-300 hover:text-blue-400 size-icon"
//                                 >
//                                     <Menu className="h-6 w-6" />
//                                 </Button>
//                             </SheetTrigger>
//                             <SheetContent
//                                 side="right"
//                                 className="w-64 bg-gray-900 text-white shadow-lg"
//                             >
//                                 <Dialog.Title className="sr-only">
//                                     Mobile Navigation
//                                 </Dialog.Title>
//                                 <div className="flex flex-col gap-6 mt-8 px-4">
//                                     {routes.map((route) => (
//                                         <Link
//                                             key={route.href}
//                                             href={route.href}
//                                             onClick={() => setIsOpen(false)}
//                                             className={cn(
//                                                 "flex items-center gap-3 text-sm font-semibold transition-all duration-200",
//                                                 "text-gray-300 hover:text-blue-300 p-3 rounded-lg hover:bg-gray-800 shadow-sm"
//                                             )}
//                                         >
//                                             <route.icon className="h-5 w-5 text-blue-300" />
//                                             {route.label}
//                                         </Link>
//                                     ))}
//                                     <div className="flex gap-4">
//                                         {!isLoaded ? (
//                                             <span>Loading...</span>
//                                         ) : user ? (
//                                             <div className="flex gap-4">
//                                                 <Button
//                                                     variant="ghost"
//                                                     className="text-white border-blue-400 border-2 hover:border-none"
//                                                     asChild
//                                                 >
//                                                     <Link href="/dashboard" className="text-white">
//                                                         Dashboard
//                                                     </Link>
//                                                 </Button>
//                                                 <UserButton />
//                                             </div>
//                                         ) : (
//                                             <div className="flex gap-4">
//                                                 <Button
//                                                     variant="ghost"
//                                                     className="text-white hover:text-blue-500"
//                                                     asChild
//                                                 >
//                                                     <Link href="/sign-in">
//                                                         <LogIn className="mr-2 h-4 w-4 text-blue-500" />
//                                                         Login
//                                                     </Link>
//                                                 </Button>
//                                                 <Button
//                                                     className="bg-blue-400 text-white hover:bg-blue-500"
//                                                     asChild
//                                                 >
//                                                     <Link href="/sign-up">Sign up</Link>
//                                                 </Button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </SheetContent>
//                         </Sheet>
//                     </div>
//                 </div>
//             </nav>
//             {showScrollTop && (
//                 <button
//                     onClick={scrollToTop}
//                     aria-label="Scroll to top"
//                     className="fixed bottom-6 right-6 bg-gradient-to-tl text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-50 backdrop-blur-sm animate-fade-in group"
//                 >
//                     <ArrowUp
//                         size={24}
//                         className="transition-transform group-hover:-translate-y-1"
//                     />
//                     <span className="absolute inset-0 rounded-full bg-white opacity-25 group-hover:animate-ping" />
//                 </button>
//             )}
//         </>
//     );
// }

// export default Navbar;'

// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from '@/lib/utils';
// import { useUser, UserButton } from "@clerk/clerk-react";
// import { Button } from '@/components/ui/button';
// import {
//     Sheet,
//     SheetContent,
//     SheetTrigger,
//     SheetTitle
// } from '@/components/ui/sheet';
// import {
//     Menu,
//     Code2,
//     Brain,
//     BookCheck,
//     LogIn,
//     MessageCircle,
//     Terminal,
//     FileCode,
//     X,
//     ArrowUp,
//     AlertCircle,
//     ChevronRight
// } from 'lucide-react';
// import GlobalVisitTracker from './components/GlobalVisitTracker';
// import FeedbackForm from './components/FeedbackForm';

// const routes = [
//     {
//         label: "Practice",
//         icon: FileCode,
//         href: "/practice",
//     },
//     {
//         label: "AI Interview",
//         icon: Brain,
//         href: "/interview",
//     },
//     {
//         label: "Assessments",
//         icon: BookCheck,
//         href: "/assessments",
//     },
//     {
//         label: "Editor",
//         icon: Terminal,
//         href: "/editor",
//     },
//     {
//         label: "Chat",
//         icon: MessageCircle,
//         href: "/chat",
//     },
// ];

// export function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showNotification, setShowNotification] = useState(true);
//     const { isLoaded, user } = useUser();
//     const [showScrollTop, setShowScrollTop] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [scrollProgress, setScrollProgress] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY;
//             setShowScrollTop(scrollTop > 300);
//             setScrolled(scrollTop > 20);

//             const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//             const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
//             setScrollProgress(progress);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <>
//             <AnimatePresence>
//                 {showNotification && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="relative"
//                     >
//                         <div className="bg-[#ff1a75] text-white py-2 px-4">
//                             <div className="max-w-7xl mx-auto flex items-center justify-between">
//                                 <div className="flex items-center space-x-2">
//                                     <AlertCircle className="h-5 w-5 text-yellow-300" />
//                                     <p className="text-sm font-medium">
//                                         We're still cooking our service. Sorry for any inconvenience.
//                                     </p>
//                                     <div className="hidden md:flex items-center gap-4 border-l border-white/30 pl-4">
//                                         <GlobalVisitTracker />
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowNotification(false)}
//                                     className="p-1 rounded-md hover:bg-black/60 transition-colors"
//                                     aria-label="Close notification"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <motion.nav
//                 initial={false}
//                 animate={{
//                     backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 1)",
//                     backdropFilter: scrolled ? "blur(12px)" : "none",
//                     borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
//                 }}
//                 transition={{ duration: 0.3 }}
//                 className="sticky top-0 z-50 w-full"
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 items-center justify-between">
//                         <div className="flex-shrink-0">
//                             <Link href="/" className="flex items-center gap-2 group">
//                                 <div className="relative">
//                                     <Code2 className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
//                                     <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                 </div>
//                                 <div className="flex items-baseline">
//                                     <span className="text-xl font-bold tracking-tight text-white">
//                                         Algo
//                                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                                             Evaluator
//                                         </span>
//                                     </span>
//                                     <span className="absolute ml-[132px] text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400">
//                                         Beta
//                                     </span>
//                                 </div>
//                             </Link>
//                         </div>

//                         <FeedbackForm />

//                         <div className="hidden md:flex items-center justify-center flex-1">
//                             <div className="flex items-center space-x-6 ml-16">
//                                 {routes.map((route) => (
//                                     <Link
//                                         key={route.href}
//                                         href={route.href}
//                                         className={cn(
//                                             "group flex items-center gap-2 text-sm font-medium transition-all duration-200",
//                                             "text-gray-300 hover:text-blue-300"
//                                         )}
//                                     >
//                                         <route.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
//                                         <span className="relative">
//                                             {route.label}
//                                             <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
//                                         </span>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
//                             {!isLoaded ? (
//                                 <div className="h-9 w-20 bg-gray-700/50 animate-pulse rounded-md"></div>
//                             ) : user ? (
//                                 <div className="flex items-center gap-4">
//                                     <Button
//                                         variant="outline"
//                                         className="text-white border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300 transition-all duration-300"
//                                         asChild
//                                     >
//                                         <Link href="/dashboard">Dashboard</Link>
//                                     </Button>
//                                     <UserButton />
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center gap-4">
//                                     <Button
//                                         variant="ghost"
//                                         className="text-gray-300 transition-colors duration-300"
//                                         asChild
//                                     >
//                                         <Link href="/sign-in" className="flex items-center">
//                                             <LogIn className="mr-2 h-4 w-4 text-blue-400" />
//                                             Login
//                                         </Link>
//                                     </Button>
//                                     <Button
//                                         className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none transition-all duration-300"
//                                         asChild
//                                     >
//                                         <Link href="/sign-up">Sign up</Link>
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex md:hidden">
//                             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                                 <SheetTrigger asChild>
//                                     <Button
//                                         variant="ghost"
//                                         className="text-white hover:text-cyan-400 hover:bg-black"
//                                     >
//                                         <Menu className="h-6 w-6" />
//                                     </Button>
//                                 </SheetTrigger>
//                                 <SheetContent
//                                     side="right"
//                                     className="w-72 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 p-0 text-white"
//                                 >
//                                     <div className="flex flex-col h-full">
//                                         <div className="p-4 border-b border-gray-800">
//                                             <div className="flex items-baseline">
//                                                 <span className="text-xl font-bold tracking-tight text-white">
//                                                     Algo
//                                                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                                                         Evaluator
//                                                     </span>
//                                                 </span>
//                                                 <span className="absolute ml-[132px] text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400">
//                                                     Beta
//                                                 </span>
//                                             </div>
//                                             <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//                                         </div>

//                                         <div className="flex-1 overflow-auto py-4 px-2">
//                                             <div className="space-y-1">
//                                                 {routes.map((route) => (
//                                                     <Link
//                                                         key={route.href}
//                                                         href={route.href}
//                                                         onClick={() => setIsOpen(false)}
//                                                         className="flex items-center justify-between p-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
//                                                     >
//                                                         <div className="flex items-center gap-3">
//                                                             <route.icon className="h-5 w-5 text-blue-400" />
//                                                             <span className="font-medium">{route.label}</span>
//                                                         </div>
//                                                         <ChevronRight className="h-4 w-4 text-gray-500" />
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>

//                                         <div className="p-4 border-t border-gray-800">
//                                             {!isLoaded ? (
//                                                 <div className="h-10 bg-gray-800 animate-pulse rounded-md"></div>
//                                             ) : user ? (
//                                                 <div className="space-y-4">
//                                                     <div className="flex items-center justify-between">
//                                                         <span className="text-sm text-gray-400">Logged in as</span>
//                                                         <UserButton />
//                                                     </div>
//                                                     <Button
//                                                         variant="outline"
//                                                         className="w-full text-white border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
//                                                         asChild
//                                                     >
//                                                         <Link href="/dashboard">Dashboard</Link>
//                                                     </Button>
//                                                 </div>
//                                             ) : (
//                                                 <div className="space-y-3">
//                                                     <Button
//                                                         variant="outline"
//                                                         className="w-full text-gray-300 border-gray-700 hover:border-blue-500/50"
//                                                         asChild
//                                                     >
//                                                         <Link href="/sign-in" className="flex items-center justify-center">
//                                                             <LogIn className="mr-2 h-4 w-4 text-blue-400" />
//                                                             Login
//                                                         </Link>
//                                                     </Button>
//                                                     <Button
//                                                         className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none"
//                                                         asChild
//                                                     >
//                                                         <Link href="/sign-up">Sign up</Link>
//                                                     </Button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </SheetContent>
//                             </Sheet>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Scroll Progress Bar */}
//                 <div className="h-0.5 w-full bg-transparent overflow-hidden">
//                     <motion.div
//                         className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
//                         style={{
//                             width: `${scrollProgress}%`,
//                             transition: "width 0.1s ease-out"
//                         }}
//                     />
//                 </div>
//             </motion.nav>

//             <AnimatePresence>
//                 {showScrollTop && (
//                     <button
//                         onClick={scrollToTop}
//                         aria-label="Scroll to top"
//                         className="fixed bottom-6 right-6 bg-gradient-to-tl text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-50 backdrop-blur-sm animate-fade-in group"
//                     >
//                         <ArrowUp
//                             size={24}
//                             className="transition-transform group-hover:-translate-y-1"
//                         />
//                         <span className="absolute inset-0 rounded-full bg-white opacity-25 group-hover:animate-ping" />
//                     </button>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// }

// export default Navbar;


"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUser, UserButton } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from '@/components/ui/sheet';
import {
    Menu,
    Code2,
    Brain,
    BookCheck,
    LogIn,
    MessageCircle,
    Terminal,
    FileCode,
    X,
    ArrowUp,
    AlertCircle,
    ChevronRight,
    Music,
    Volume2,
    ChevronLeft,
    Sparkles
} from 'lucide-react';
import GlobalVisitTracker from './components/GlobalVisitTracker';

const routes = [
    {
        label: "Practice",
        icon: FileCode,
        href: "/practice",
    },
    {
        label: "AI Interview",
        icon: Brain,
        href: "/interview",
    },
    {
        label: "Assessments",
        icon: BookCheck,
        href: "/assessments",
    },
    {
        label: "Editor",
        icon: Terminal,
        href: "/editor",
    },
    {
        label: "Chat",
        icon: MessageCircle,
        href: "/chat",
    },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(true);
    const [showMusicTab, setShowMusicTab] = useState(true);
    const [isMusicTabHovered, setIsMusicTabHovered] = useState(false);
    const { isLoaded, user } = useUser();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setShowScrollTop(scrollTop > 300);
            setScrolled(scrollTop > 20);

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Slide-out Music Announcement */}
            <AnimatePresence>
                {showMusicTab && (
                    <motion.div
                        initial={{ x: "calc(100% - 56px)" }}
                        animate={{
                            x: isMusicTabHovered ? 0 : "calc(100% - 56px)",
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 40
                            }
                        }}
                        exit={{ x: "100%", transition: { duration: 0.2 } }}
                        onHoverStart={() => setIsMusicTabHovered(true)}
                        onHoverEnd={() => setIsMusicTabHovered(false)}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
                    >
                        <div className="flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-l-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10">
                            <motion.div
                                className="flex items-center p-4 text-white"
                                animate={{
                                    backgroundColor: isMusicTabHovered ? "rgba(255, 255, 255, 0.1)" : "transparent"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronLeft className={cn(
                                    "h-6 w-6 transition-transform duration-300",
                                    isMusicTabHovered ? "rotate-180" : ""
                                )} />
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-5 p-4 pr-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="relative">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md">
                                        <Music className="h-6 w-6 text-white" />
                                    </div>
                                    <motion.div
                                        className="absolute -top-1 -right-1"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 10, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <Sparkles className="h-4 w-4 text-yellow-300" />
                                    </motion.div>
                                </div>
                                <div className="flex flex-col min-w-[220px]">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-white">New Feature!</h3>
                                        <span className="px-2 py-0.5 text-[10px] font-medium bg-white/20 rounded-full text-white">Working on it</span>
                                    </div>
                                    <p className="text-sm text-blue-100 mt-0.5">Enhance Focus with Calm Music</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="bg-white/10 text-white hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-sm whitespace-nowrap shadow-lg"
                                        onClick={() => window.location.href = '/editor'}
                                    >
                                        <Volume2 className="w-4 h-4 mr-2" />
                                        Try Now
                                    </Button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowMusicTab(false);
                                        }}
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                                        aria-label="Close announcement"
                                    >
                                        <X className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <div className="bg-[#ff1a75] text-white py-2 px-4">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <AlertCircle className="h-5 w-5 text-yellow-300" />
                                    <p className="text-sm font-medium">
                                        We're still cooking our service. Sorry for any inconvenience.
                                    </p>
                                    <div className="hidden md:flex items-center gap-4 border-l border-white/30 pl-4">
                                        <GlobalVisitTracker />
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="p-1 rounded-md hover:bg-black/60 transition-colors"
                                    aria-label="Close notification"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.nav
                initial={false}
                animate={{
                    backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 1)",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="sticky top-0 z-50 w-full"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="relative">
                                    <Code2 className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="flex items-baseline">
                                    <span className="text-xl font-bold tracking-tight text-white">
                                        Algo
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                            Evaluator
                                        </span>
                                    </span>
                                    <span className="absolute ml-[140px] text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400">
                                        Beta
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center justify-center flex-1">
                            <div className="flex items-center space-x-6 ml-16">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "group flex items-center gap-2 text-sm font-medium transition-all duration-200",
                                            "text-gray-300 hover:text-blue-300"
                                        )}
                                    >
                                        <route.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        <span className="relative">
                                            {route.label}
                                            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
                            {!isLoaded ? (
                                <div className="h-9 w-20 bg-gray-700/50 animate-pulse rounded-md"></div>
                            ) : user ? (
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="outline"
                                        className="text-white border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300 transition-all duration-300"
                                        asChild
                                    >
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <UserButton />
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        className="text-gray-300 transition-colors duration-300"
                                        asChild
                                    >
                                        <Link href="/sign-in" className="flex items-center">
                                            <LogIn className="mr-2 h-4 w-4 text-blue-400" />
                                            Login
                                        </Link>
                                    </Button>
                                    <Button
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none transition-all duration-300"
                                        asChild
                                    >
                                        <Link href="/sign-up">Sign up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex md:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="text-white hover:text-cyan-400 hover:bg-black"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-72 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 p-0 text-white"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="p-4 border-b border-gray-800">
                                            <div className="flex items-baseline">
                                                <span className="text-xl font-bold tracking-tight text-white">
                                                    Algo
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                                        Evaluator
                                                    </span>
                                                </span>
                                                <span className="absolute ml-[132px] text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400">
                                                    Beta
                                                </span>
                                            </div>
                                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                        </div>

                                        <div className="flex-1 overflow-auto py-4 px-2">
                                            <div className="space-y-1">
                                                {routes.map((route) => (
                                                    <Link
                                                        key={route.href}
                                                        href={route.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center justify-between p-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <route.icon className="h-5 w-5 text-blue-400" />
                                                            <span className="font-medium">{route.label}</span>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-4 border-t border-gray-800">
                                            {!isLoaded ? (
                                                <div className="h-10 bg-gray-800 animate-pulse rounded-md"></div>
                                            ) : user ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-400">Logged in as</span>
                                                        <UserButton />
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full text-white border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                                                        asChild
                                                    >
                                                        <Link href="/dashboard">Dashboard</Link>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full text-gray-300 border-gray-700 hover:border-blue-500/50"
                                                        asChild
                                                    >
                                                        <Link href="/sign-in" className="flex items-center justify-center">
                                                            <LogIn className="mr-2 h-4 w-4 text-blue-400" />
                                                            Login
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none"
                                                        asChild
                                                    >
                                                        <Link href="/sign-up">Sign up</Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                {/* Scroll Progress Bar */}
                <div className="h-0.5 w-full bg-transparent overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{
                            width: `${scrollProgress}%`,
                            transition: "width 0.1s ease-out"
                        }}
                    />
                </div>
            </motion.nav>

            <AnimatePresence>
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="fixed bottom-6 right-6 bg-gradient-to-tl text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-50 backdrop-blur-sm animate-fade-in group"
                    >
                        <ArrowUp
                            size={24}
                            className="transition-transform group-hover:-translate-y-1"
                        />
                        <span className="absolute inset-0 rounded-full bg-white opacity-25 group-hover:animate-ping" />
                    </button>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;