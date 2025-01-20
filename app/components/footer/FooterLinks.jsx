import React from "react";

export function FooterLinks() {
    const links = {
        Product: ["Features", "Pricing", "Case Studies", "Reviews"],
        Company: ["About", "Careers", "Blog", "Contact"],
        Resources: ["Documentation", "Support", "API", "Partner Program"],
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items]) => (
                <div key={category}>
                    <h3 className="text-white font-semibold mb-4">{category}</h3>
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
