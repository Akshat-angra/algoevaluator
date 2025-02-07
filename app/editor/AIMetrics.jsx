import React from 'react';
import { BarChart2, Clock, Cpu, ShieldCheck } from 'lucide-react';

const AIMetrics = ({ metrics, theme }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} 
            transition-all duration-200 hover:scale-105`}
                >
                    <div className="flex items-center space-x-3">
                        {React.createElement(metric.icon, { className: `w-5 h-5 ${metric.color}` })}
                        <div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {metric.label}
                            </div>
                            <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                {metric.value}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AIMetrics;
