import React from "react";
import { Twitter, Linkedin, Github, Facebook } from "lucide-react";

export function FooterSocial() {
    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Facebook, href: "#", label: "Facebook" },
    ];

    return (
        <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Icon className="w-5 h-5" />
                </a>
            ))}
        </div>
    );
}
