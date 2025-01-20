"use client";
import { Montserrat } from "next/font/google";
import { SignIn } from "@clerk/nextjs";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={`flex min-h-screen ${montserrat.className}`}>
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          alt="AlgoHire Background"
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="w-12 h-12" />
            <h1 className="text-4xl font-bold">AlgoHire</h1>
          </div>
          <p className="text-xl text-center max-w-md">
            Welcome back! Access your account to manage your hiring pipeline and
            find exceptional developers.
          </p>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Code2 className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AlgoHire</h1>
          </div>
          <span className="flex text-black m-2 hover:underline">
            <a href="/">Back to home</a>
          </span>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
