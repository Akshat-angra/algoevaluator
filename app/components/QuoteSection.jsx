// components/SingleLineQuoteSection.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const SingleLineQuoteSection = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timerRef = useRef(null);

    const quotes = [
        "Algorithms are the poetry of logic, elegantly solving what once seemed impossible.",
        "Behind every difficult algorithm problem lies a beautiful insight waiting to be discovered.",
        "The measure of intelligence is the ability to change — adapt your approach when stuck.",
        "Complexity is conquered one step at a time, one line of code at a time.",
        "When you can't solve a problem, it's not a dead end; it's an invitation to think differently.",
        "Great algorithms don't just solve problems — they reveal hidden patterns in the universe."
    ];

    useEffect(() => {
        startTimer();
        return () => clearTimeout(timerRef.current);
    }, [currentQuoteIndex]);

    const startTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            nextQuote();
        }, 5000);
    };

    const nextQuote = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) =>
                prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div className="flex w-full mb-8">
            {/* Left-positioned container */}
            <div className="max-w-md bg-gradient-to-r from-blue-900 to-indigo-900 py-4 px-6 shadow-md relative overflow-hidden rounded-r-lg">
                {/* Background elements */}
                <div className="absolute inset-0 flex items-center justify-start opacity-5">
                    <ArrowLeftRight size={120} strokeWidth={1} />
                </div>

                {/* Quote container */}
                <div className="relative h-10 flex items-center justify-start overflow-hidden">
                    <div
                        className={`whitespace-nowrap transition-all duration-500 text-left ${isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
                            }`}
                    >
                        <p className="text-sm md:text-base text-white font-medium tracking-wide">
                            {quotes[currentQuoteIndex]}
                        </p>
                    </div>
                </div>

                {/* Animated bar */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400 w-full">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                        style={{
                            width: '100%',
                            animation: 'progressBar 5s linear infinite',
                        }}
                    />
                </div>
            </div>

            {/* Empty space to the right */}
            <div className="flex-grow"></div>

            <style jsx>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
        </div>
    );
};

export default SingleLineQuoteSection;