import React from "react";

export function FooterLinks() {
    const links = {
        Product: [
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Case Studies", href: "/case-studies" },
            { name: "Reviews", href: "/reviews" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
        ],
        Resources: [
            { name: "Documentation", href: "/documentation" },
            { name: "Support", href: "/support" },
            { name: "API", href: "/api" },
            { name: "Partner Program", href: "/partner-program" },
        ],
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items]) => (
                <div key={category}>
                    <h3 className="text-white font-semibold mb-4">{category}</h3>
                    <ul className="space-y-2">
                        {items.map(({ name, href }) => (
                            <li key={name}>
                                <a
                                    href={href}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
