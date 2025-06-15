"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { FooterSection } from "../components/footer/FooterSection";
import { motion } from "framer-motion";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

function Page() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-[#0F0F2A] to-gray-900 text-gray-100 overflow-hidden relative">
            <ResumeForm />
            <br />
            <ResumePreview />
            <FooterSection />
        </div>
    );
}

export default Page;

