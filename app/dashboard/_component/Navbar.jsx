"use client";
import { Quicksand } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Code2,
  Brain,
  BookCheck,
  Terminal,
  MessageCircle,
  X,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import LoginUser from "@/app/components/LoginUser";
import UserGreeting from "../../components/UserGreeting";

const routes = [
  {
    label: "Practice",
    icon: Code2,
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

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    setMounted(true);
    // Set active route based on current path
    if (typeof window !== "undefined") {
      setActiveRoute(window.location.pathname);
    }
  }, []);

  return (
    <>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-[#ff1a75] text-white p-2 shadow-lg"
        >
          <div className="flex items-center gap-3 pl-4">
            <AlertCircle className="flex-shrink-0 text-amber-300" size={18} />
            <span className="text-sm font-medium tracking-tighter">
              Dashboard features are being rolled out gradually. Some features may be unavailable.
            </span>
            <div className="h-4 border-l border-white/80"></div>
            <div className="flex items-center gap-2">
              <LoginUser />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4 p-1 rounded-full hover:bg-black/30 transition-colors"
            onClick={() => setShowNotification(false)}
          >
            <X size={18} className="text-white" />
          </motion.button>
        </motion.div>
      )}

      <nav className="w-full bg-[#0a0a0a] backdrop-blur-lg z-50 sticky top-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-[#0a0a0a] rounded-full p-2">
                  <Code2 className="h-6 w-6 text-blue-400 transition-colors" />
                </div>
              </div>
              <span className={`text-xl font-bold tracking-tight text-white`}>
                Algo<span className="text-blue-400">Evaluator</span>
                <span className="text-xs absolute border-blue-300 text-white border ml-1 px-2 py-0.5 rounded-lg bg-[#0a0a0a]/80">
                  Beta
                </span>
              </span>
            </Link>

            <div className="hidden md:flex flex-1 justify-between items-center px-8 ml-8">
              <div className="flex gap-6">
                {routes.map((route) => {
                  const isActive = activeRoute === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium relative px-3 py-2 rounded-lg transition-all duration-300",
                        isActive
                          ? "text-white bg-blue-500/10"
                          : "text-gray-300 hover:text-white hover:bg-blue-500/5"
                      )}
                      onClick={() => setActiveRoute(route.href)}
                    >
                      <route.icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "text-gray-400")} />
                      {route.label}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="py-2 px-4 rounded-md text-white border border-blue-400/30 hover:border-blue-400/70 hover:bg-blue-400/10 transition-all duration-300 hover:text-white"
                >
                  <Link href="/">Home</Link>
                </Button>

                {isSignedIn ? (
                  <div className="rounded-full">
                    <UserButton />
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-blue-300 transition-colors"
                      asChild
                    >
                      <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button
                      className="bg-blue-400 text-white hover:bg-blue-500 transition-all duration-300"
                      asChild
                    >
                      <Link href="/sign-up" className="flex items-center gap-1">
                        Sign up
                        <ChevronRight size={16} />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-1 justify-end md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-300 hover:text-blue-400 rounded-full p-2 hover:bg-blue-400/10"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 bg-[#0a0a0a]/95 text-white border-l border-blue-500/20 backdrop-blur-lg"
                >
                  <Dialog.Title className="sr-only">
                    Mobile Navigation
                  </Dialog.Title>
                  <div className="flex flex-col mt-12 px-2">
                    <div className="flex items-center gap-2 mb-8 px-4">
                      <Code2 className="h-6 w-6 text-blue-400" />
                      <span className={`text-xl font-bold tracking-tight text-white ${quick.className}`}>
                        Algo<span className="text-blue-400">Evaluator</span>
                      </span>
                    </div>
                    {routes.map((route) => {
                      const isActive = activeRoute === route.href;
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveRoute(route.href);
                          }}
                          className={cn(
                            "flex items-center gap-3 text-sm font-semibold transition-all duration-200 mb-2",
                            isActive
                              ? "text-white bg-blue-500/20 p-3 rounded-lg border-l-2 border-blue-400"
                              : "text-gray-300 hover:text-white p-3 rounded-lg hover:bg-blue-500/10"
                          )}
                        >
                          <route.icon className={cn("h-5 w-5", isActive ? "text-blue-400" : "text-gray-400")} />
                          {route.label}
                        </Link>
                      );
                    })}
                    <div className="flex flex-col gap-4 mt-8 px-2">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-4"></div>
                      {isSignedIn ? (
                        <>
                          <Button
                            variant="ghost"
                            className="py-2 px-4 rounded-md text-white border border-blue-400/30 hover:bg-blue-400/10 hover:text-white"
                          >
                            <Link href="/">Home</Link>
                          </Button>
                          <div className="p-2 rounded-full w-fit">
                            <UserButton />
                          </div>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            asChild
                            className="bg-transparent border border-blue-300 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 px-4 py-2 rounded-lg transition-all duration-200"
                          >
                            <Link
                              href="/sign-in"
                              onClick={() => setIsOpen(false)}
                            >
                              Login
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200"
                          >
                            <Link
                              href="/sign-up"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-center gap-1"
                            >
                              Sign Up
                              <ChevronRight size={16} />
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;