"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Code2,
  Brain,
  BookCheck,
  LogIn,
  MessageCircle,
  Terminal,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

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

  return (
    <nav className="w-full bg-[#0a0a0a] backdrop-blur supports-[backdrop-filter]:bg-black/100 z-10">
      <div className="flex h-16 items-center justify-between px-20 w-full">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold tracking-tight text-white">
            Algo<span className="text-blue-400">Hire</span>
          </span>
        </Link>
        <div className="hidden md:flex flex-1 justify-between items-center px-20">
          <div className="flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-300",
                  "text-white"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:text-blue-500"
              asChild
            >
              <Link href="/sign-in">
                <LogIn className="mr-2 h-4 w-4 text-blue-500" />
                Login
              </Link>
            </Button>
            <Button
              className="bg-blue-400 text-white hover:bg-blue-500"
              asChild
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-blue-300 hover:text-blue-400 size-icon"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 bg-gray-900 text-white shadow-lg"
            >
              <Dialog.Title className="sr-only">Mobile Navigation</Dialog.Title>
              <div className="flex flex-col gap-6 mt-8 px-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 text-sm font-semibold transition-all duration-200",
                      "text-gray-300 hover:text-blue-300 p-3 rounded-lg hover:bg-gray-800 shadow-sm"
                    )}
                  >
                    <route.icon className="h-5 w-5 text-blue-300" />
                    {route.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 mt-6">
                  <Button
                    variant="ghost"
                    asChild
                    className="bg-transparent border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
