'use client';

import React from 'react';
import { Code2 } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';

const App = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Hero Image and Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          alt="AlgoHire Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <div className="flex items-center gap-3 mb-12 transform hover:scale-105 transition-transform duration-300">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Code2 className="w-14 h-14 text-blue-500" />
            </div>
            <h1 className="text-5xl font-black tracking-tight">AlgoHire</h1>
          </div>
          <div className="space-y-6 max-w-lg">
            <p className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Elevate Your Engineering Team
            </p>
            <p className="text-xl text-center text-gray-400 leading-relaxed">
              Access your account to discover and hire exceptional developers who will transform your technology landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <Code2 className="w-10 h-10 text-blue-500" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white">AlgoHire</h1>
            </div>
            <p className="text-lg text-center text-gray-400">
              Welcome back to the future of hiring
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-sm">← Back to home</span>
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-1">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;