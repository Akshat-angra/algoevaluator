import React from 'react';
import { Lightbulb, Zap, Bug, Gauge } from 'lucide-react';

const getHintIcon = (type) => {
    switch (type) {
        case 'suggestion':
            return <Lightbulb className="w-4 h-4 text-yellow-500" />;
        case 'optimization':
            return <Zap className="w-4 h-4 text-purple-500" />;
        case 'bug':
            return <Bug className="w-4 h-4 text-red-500" />;
        case 'performance':
            return <Gauge className="w-4 h-4 text-green-500" />;
        default:
            return null;
    }
};

const getHintColor = (type, theme) => {
    const isDark = theme === 'dark';
    switch (type) {
        case 'suggestion':
            return isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-100';
        case 'optimization':
            return isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-100';
        case 'bug':
            return isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100';
        case 'performance':
            return isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100';
        default:
            return '';
    }
};

const AIHints = ({ hints, theme }) => {
    if (hints.length === 0) {
        return (
            <div className={`p-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No AI hints available yet. Run the code analysis to get suggestions.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {hints.map((hint, index) => (
                <div
                    key={index}
                    className={`p-3 rounded-lg border ${getHintColor(hint.type, theme)} transition-colors duration-200`}
                >
                    <div className="flex items-start space-x-3">
                        {getHintIcon(hint.type)}
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                {hint.message}
                            </div>
                            {hint.line && (
                                <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Line: {hint.line}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AIHints;
