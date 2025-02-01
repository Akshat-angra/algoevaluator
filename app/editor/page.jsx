"use client";
import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import toast, { Toaster } from 'react-hot-toast';
import {
    Play,
    RotateCcw,
    Settings,
    Terminal,
    Code2,
    Copy,
    Download,
    Share2,
    Trash2,
    Clock,
    ChevronDown,
    Palette,
    Maximize2,
    BookOpen,
    CheckCircle,
} from 'lucide-react';

const EXAMPLES = [
    {
        name: 'Fibonacci (JavaScript)',
        language: 'javascript',
        code: `// Calculate Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    },
    {
        name: 'Quick Sort (JavaScript)',
        language: 'javascript',
        code: `// Quick sort implementation
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(numbers));`,
    },
    {
        name: 'Binary Search (Python)',
        language: 'python',
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test the function
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 7
print(f"Found {target} at index:", binary_search(arr, target))`,
    },
];

function App() {
    const [code, setCode] = useState(EXAMPLES[0].code);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [history, setHistory] = useState([]);
    const [language, setLanguage] = useState('javascript');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [showExamples, setShowExamples] = useState(false);

    const getLanguageExtension = useCallback((lang) => {
        switch (lang) {
            case 'python':
                return python();
            case 'javascript':
            default:
                return javascript({ jsx: true });
        }
    }, []);

    const runCode = useCallback(() => {
        setIsRunning(true);
        setOutput('');

        const originalLog = console.log;
        let outputBuffer = '';

        console.log = (...args) => {
            outputBuffer += args
                .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
                .join(' ') + '\n';
        };

        try {
            if (language === 'python') {
                setOutput('Python execution is simulated in this environment.\n\nActual Python execution would require a backend server.');
                toast.success('Code executed in simulation mode');
            } else {
                // eslint-disable-next-line no-eval
                eval(code);
                setOutput(outputBuffer || 'Code executed successfully (no output)');
                toast.success('Code executed successfully');
            }

            setHistory((prev) => [
                ...prev,
                {
                    code,
                    output: outputBuffer || 'No output',
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
            toast.error('Execution failed: ' + error.message);
        } finally {
            console.log = originalLog;
            setIsRunning(false);
        }
    }, [code, language]);

    const Header = () => (
        <header className={`bg-${theme === 'dark' ? 'gray-900/95' : 'white/95'} border-b sticky top-0 z-50`}>
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Terminal className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold">AlgoEvaluator Pro</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ExamplesDropdown />
                        <LanguageSelector />
                        <ThemeToggle />
                        <FullscreenToggle />
                        <SettingsButton />
                    </div>
                </div>
            </div>
        </header>
    );

    const ExamplesDropdown = () => (
        <div className="relative">
            <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg"
            >
                <BookOpen className="w-4 h-4" />
                <span>Examples</span>
                <ChevronDown className="w-4 h-4" />
            </button>
            {showExamples && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                    {EXAMPLES.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCode(example.code);
                                setLanguage(example.language);
                                setShowExamples(false);
                                toast.success(`Loaded ${example.name}`);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            {example.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const LanguageSelector = () => (
        <select
            value={language}
            onChange={(e) => {
                setLanguage(e.target.value);
                toast.success(`Switched to ${e.target.value}`);
            }}
            className="px-3 py-2 rounded-lg bg-white border"
        >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
        </select>
    );

    const ThemeToggle = () => (
        <button
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                toast.success(`Switched to ${theme === 'dark' ? 'light' : 'dark'} theme`);
            }}
            className="p-2 rounded-lg"
            title="Toggle Theme"
        >
            <Palette className="w-5 h-5" />
        </button>
    );

    const FullscreenToggle = () => (
        <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg"
            title="Toggle Fullscreen"
        >
            <Maximize2 className="w-5 h-5" />
        </button>
    );

    const SettingsButton = () => (
        <button className="p-2 rounded-lg" title="Settings">
            <Settings className="w-5 h-5" />
        </button>
    );

    const CodeEditor = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-semibold">Code Editor</h2>
                </div>
                <EditorToolbar />
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <CodeMirror
                    value={code}
                    height="500px"
                    theme={oneDark}
                    extensions={[getLanguageExtension(language)]}
                    onChange={(value) => setCode(value)}
                    className="text-sm"
                />
            </div>
            <RunButton />
        </div>
    );

    const EditorToolbar = () => (
        <div className="flex space-x-2">
            <button onClick={() => {
                navigator.clipboard.writeText(code);
                toast.success('Code copied to clipboard');
            }} className="p-2 rounded-lg">
                <Copy className="w-4 h-4" />
            </button>
            <button onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('code', btoa(code));
                url.searchParams.set('language', language);
                navigator.clipboard.writeText(url.toString());
                toast.success('Share link copied to clipboard');
            }} className="p-2 rounded-lg">
                <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => {
                const example = EXAMPLES.find((ex) => ex.language === language) || EXAMPLES[0];
                setCode(example.code);
                setOutput('');
                toast.success('Code reset to example');
            }} className="p-2 rounded-lg">
                <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => {
                const extension = language === 'python' ? 'py' : 'js';
                const blob = new Blob([code], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `code.${extension}`;
                link.click();
                toast.success('Code downloaded successfully');
            }} className="p-2 rounded-lg">
                <Download className="w-4 h-4" />
            </button>
        </div>
    );

    const RunButton = () => (
        <button
            onClick={runCode}
            disabled={isRunning}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
        transition duration-200 flex items-center justify-center space-x-2 
        disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isRunning ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
                <Play className="w-4 h-4" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
        </button>
    );

    const Output = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Output</h2>
                <button
                    onClick={() => {
                        setOutput('');
                        toast.success('Output cleared');
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear</span>
                </button>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 h-[500px] overflow-auto">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                    {output || 'Run your code to see the output here...'}
                </pre>
            </div>
            <ExecutionHistory />
        </div>
    );

    const ExecutionHistory = () => (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold">Execution History</h3>
            </div>
            <div className="text-sm text-gray-400">
                {history.length === 0 ? (
                    'No executions yet'
                ) : (
                    <div className="space-y-2">
                        {history
                            .slice(-3)
                            .reverse()
                            .map((entry, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 rounded-lg 
                    hover:bg-gray-800 transition-colors cursor-pointer"
                                    onClick={() => {
                                        setCode(entry.code);
                                        setOutput(entry.output);
                                        toast.success('Loaded previous execution');
                                    }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Execution #{history.length - index}</span>
                                    </div>
                                    <span className="text-xs opacity-60">{entry.timestamp.toLocaleTimeString()}</span>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen bg-${theme === 'dark' ? 'gray-950' : 'gray-50'} text-${theme === 'dark' ? 'gray-100' : 'gray-900'}`}>
            <Toaster position="top-right" />
            <Header />
            <main className={`container mx-auto px-4 py-6 ${isFullscreen ? 'max-w-none' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CodeEditor />
                    <Output />
                </div>
            </main>
        </div>
    );
}

export default App;
