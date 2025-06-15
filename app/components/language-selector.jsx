"use client";

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Language configuration with appropriate icons and setup
const languages = [
    {
        value: 'javascript',
        label: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        defaultCode: '// Write your JavaScript solution here\nfunction solve(input) {\n  // Your code here\n  return result;\n}'
    },
    {
        value: 'python',
        label: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        defaultCode: '# Write your Python solution here\ndef solve(input):\n    # Your code here\n    return result'
    },
    {
        value: 'java',
        label: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        defaultCode: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n    \n    public static Object solve(Object input) {\n        // Your code here\n        return result;\n    }\n}'
    },
    {
        value: 'cpp',
        label: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        defaultCode: '#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}\n\nauto solve(auto input) {\n    // Your code here\n    return result;\n}'
    },
    {
        value: 'typescript',
        label: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        defaultCode: '// Write your TypeScript solution here\nfunction solve(input: any): any {\n  // Your code here\n  return result;\n}'
    }
];

export default function LanguageSelector({ value, onChange, disabled = false }) {
    const handleChange = (newValue) => {
        const selectedLanguage = languages.find(lang => lang.value === newValue);

        if (onChange && selectedLanguage) {
            onChange(selectedLanguage.value, selectedLanguage.defaultCode);
        }
    };

    const selectedLanguage = languages.find(lang => lang.value === value) || languages[0];

    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor="language-select" className="text-sm font-medium">
                Programming Language
            </label>
            <Select
                value={value}
                onValueChange={handleChange}
                disabled={disabled}
            >
                <SelectTrigger id="language-select" className="w-[200px]">
                    <div className="flex items-center">
                        {selectedLanguage.icon && (
                            <div className="w-5 h-5 mr-2 flex-shrink-0">
                                <img
                                    src={selectedLanguage.icon}
                                    alt={selectedLanguage.label}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <SelectValue placeholder="Select language" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                            <div className="flex items-center">
                                {language.icon && (
                                    <div className="w-5 h-5 mr-2 flex-shrink-0">
                                        <img
                                            src={language.icon}
                                            alt={language.label}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                {language.label}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}