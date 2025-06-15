// 'use client';
// import { useState, useEffect, useRef } from "react";
// import {
//   Maximize2, Minimize2, Play, Save, Download, Upload, Code,
//   Settings, Moon, Sun, AlertCircle, Share2, Clock, Star,
//   History, FileText, Terminal, Database, Lock, ChevronDown,
//   Coffee, Zap, Book, CheckCircle, XCircle, GitBranch,
//   BarChart2, Cpu, Cloud, AlignLeft, FileCode
// } from "lucide-react";

// // Main AlgoStub AI Compiler App
// function AlgoStubCompiler() {
//   // State management
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [theme, setTheme] = useState("monokai");
//   const [fontSize, setFontSize] = useState("14px");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [aiSuggestions, setAiSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [activeTab, setActiveTab] = useState("editor");
//   const [savedSnippets, setSavedSnippets] = useState([]);
//   const [executionTime, setExecutionTime] = useState(null);
//   const [memoryUsage, setMemoryUsage] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [showSettings, setShowSettings] = useState(false);
//   const [codeHistory, setCodeHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [debugMode, setDebugMode] = useState(false);
//   const [breakpoints, setBreakpoints] = useState([]);
//   const [errorLines, setErrorLines] = useState([]);
//   const [isSharing, setIsSharing] = useState(false);
//   const [projectName, setProjectName] = useState("Untitled Project");
//   const [isProjectNameEditing, setIsProjectNameEditing] = useState(false);
//   const [testCases, setTestCases] = useState([]);
//   const [testResults, setTestResults] = useState([]);
//   const [showAutoComplete, setShowAutoComplete] = useState(false);
//   const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
//   const [editorWidth, setEditorWidth] = useState(50);

//   // Refs
//   const editorRef = useRef(null);
//   const dragRef = useRef(null);

//   // Languages supported
//   const languages = [
//     { id: "javascript", name: "JavaScript", icon: "js" },
//     { id: "python", name: "Python", icon: "py" },
//     { id: "java", name: "Java", icon: "java" },
//     { id: "cpp", name: "C++", icon: "cpp" },
//     { id: "ruby", name: "Ruby", icon: "rb" },
//     { id: "go", name: "Go", icon: "go" },
//     { id: "rust", name: "Rust", icon: "rs" },
//     { id: "typescript", name: "TypeScript", icon: "ts" },
//     { id: "php", name: "PHP", icon: "php" },
//     { id: "csharp", name: "C#", icon: "cs" }
//   ];

//   // Editor themes
//   const themes = [
//     { id: "monokai", name: "Monokai" },
//     { id: "github", name: "GitHub" },
//     { id: "tomorrow_night", name: "Tomorrow Night" },
//     { id: "dracula", name: "Dracula" },
//     { id: "solarized_dark", name: "Solarized Dark" },
//     { id: "solarized_light", name: "Solarized Light" }
//   ];

//   // AI Assistant presets
//   const aiPresets = [
//     { id: "optimize", name: "Optimize Code", description: "Make your code faster and more efficient" },
//     { id: "debug", name: "Debug Code", description: "Find and fix errors in your code" },
//     { id: "refactor", name: "Refactor Code", description: "Improve code structure and readability" },
//     { id: "explain", name: "Explain Code", description: "Get a detailed explanation of what your code does" },
//     { id: "security", name: "Security Check", description: "Find potential security vulnerabilities" }
//   ];

//   // Auto-complete keywords per language
//   const autoCompleteKeywords = {
//     javascript: ["function", "const", "let", "var", "if", "else", "return", "for", "while", "class"],
//     python: ["def", "class", "if", "else", "elif", "for", "while", "return", "import", "try"],
//     java: ["public", "class", "static", "void", "int", "String", "if", "else", "for", "while"],
//     cpp: ["int", "void", "class", "public", "private", "for", "while", "if", "else", "return"],
//     ruby: ["def", "class", "if", "else", "end", "for", "while", "return", "module", "require"],
//     go: ["func", "package", "import", "if", "else", "for", "return", "var", "const", "type"],
//     rust: ["fn", "let", "mut", "if", "else", "for", "while", "return", "struct", "impl"],
//     typescript: ["function", "const", "let", "interface", "type", "if", "else", "for", "while", "return"],
//     php: ["function", "class", "public", "private", "if", "else", "for", "while", "return", "echo"],
//     csharp: ["public", "class", "static", "void", "int", "string", "if", "else", "for", "while"]
//   };

//   // Initial setup
//   useEffect(() => {
//     const savedSettings = localStorage.getItem('algostub_settings');
//     if (savedSettings) {
//       const settings = JSON.parse(savedSettings);
//       setLanguage(settings.language || "javascript");
//       setTheme(settings.theme || "monokai");
//       setFontSize(settings.fontSize || "14px");
//       setIsDarkMode(settings.isDarkMode !== undefined ? settings.isDarkMode : true);
//     }

//     const savedSnippetsData = localStorage.getItem('algostub_snippets');
//     if (savedSnippetsData) {
//       setSavedSnippets(JSON.parse(savedSnippetsData));
//     }

//     const savedTestCases = localStorage.getItem('algostub_test_cases');
//     if (savedTestCases) {
//       setTestCases(JSON.parse(savedTestCases));
//     }

//     setAiSuggestions([
//       {
//         title: "Optimize your loop structure",
//         description: "Using map() instead of for loop could improve readability",
//         code: "// Optimized version\nconst results = data.map(item => item.value * 2);"
//       },
//       {
//         title: "Consider adding error handling",
//         description: "Your code might throw errors without proper try/catch blocks",
//         code: "try {\n  // Your existing code\n} catch (error) {\n  console.error('An error occurred:', error);\n}"
//       }
//     ]);
//   }, []);

//   useEffect(() => {
//     const settings = { language, theme, fontSize, isDarkMode };
//     localStorage.setItem('algostub_settings', JSON.stringify(settings));
//   }, [language, theme, fontSize, isDarkMode]);

//   // Resizable panel drag handler
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (dragRef.current) {
//         const containerWidth = document.querySelector('.flex-1').offsetWidth;
//         const newWidth = (e.clientX / containerWidth) * 100;
//         if (newWidth >= 30 && newWidth <= 70) {
//           setEditorWidth(newWidth);
//         }
//       }
//     };

//     const handleMouseUp = () => {
//       dragRef.current = null;
//       document.body.style.cursor = 'default';
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, []);

//   const compileCode = async () => {
//     setIsLoading(true);
//     setOutput("");
//     setErrorLines([]);

//     const historyItem = {
//       id: Date.now(),
//       code,
//       language,
//       timestamp: new Date().toISOString()
//     };
//     setCodeHistory(prevHistory => [historyItem, ...prevHistory]);

//     const startTime = performance.now();

//     try {
//       const response = await fetch('/api/compile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, language, debugMode, breakpoints }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setOutput(data.output);
//         setExecutionTime((performance.now() - startTime).toFixed(2));
//         setMemoryUsage(data.memoryUsage || "2.4 MB");

//         if (data.suggestions && data.suggestions.length > 0) {
//           setAiSuggestions(data.suggestions);
//           setShowSuggestions(true);
//         }

//         addNotification("success", "Code executed successfully");
//       } else {
//         setOutput(`Error: ${data.error}`);
//         setErrorLines(data.errorLines || [1]); // Simulate error lines
//         addNotification("error", "Execution failed: " + data.error);
//       }
//     } catch (error) {
//       setTimeout(() => {
//         const demoOutput = `Running ${language} code...\n\n// Output:\n${simulateOutput(code, language)}`;
//         setOutput(demoOutput);
//         setExecutionTime((performance.now() - startTime).toFixed(2));
//         setMemoryUsage("2.4 MB");
//         addNotification("success", "Code executed successfully");
//       }, 1500);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveCode = async () => {
//     try {
//       const snippetId = Date.now().toString();
//       const newSnippet = {
//         id: snippetId,
//         name: projectName,
//         language,
//         code,
//         createdAt: new Date().toISOString(),
//         favorite: false
//       };

//       setSavedSnippets(prev => [newSnippet, ...prev]);
//       const updatedSnippets = [newSnippet, ...savedSnippets];
//       localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));

//       addNotification("success", "Code saved successfully");
//     } catch (error) {
//       addNotification("error", "Error saving code");
//     }
//   };

//   const applySuggestion = (suggestion) => {
//     setCode(suggestion.code);
//     setShowSuggestions(false);
//     addNotification("info", "AI suggestion applied");
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleDebugMode = () => {
//     setDebugMode(!debugMode);
//     addNotification("info", debugMode ? "Debug mode disabled" : "Debug mode enabled");
//   };

//   const addBreakpoint = (lineNumber) => {
//     if (breakpoints.includes(lineNumber)) {
//       setBreakpoints(breakpoints.filter(bp => bp !== lineNumber));
//     } else {
//       setBreakpoints([...breakpoints, lineNumber]);
//     }
//   };

//   const loadSnippet = (snippet) => {
//     setCode(snippet.code);
//     setLanguage(snippet.language);
//     setProjectName(snippet.name);
//     addNotification("info", `Loaded: ${snippet.name}`);
//   };

//   const toggleFavorite = (snippetId) => {
//     const updatedSnippets = savedSnippets.map(snippet =>
//       snippet.id === snippetId ? { ...snippet, favorite: !snippet.favorite } : snippet
//     );
//     setSavedSnippets(updatedSnippets);
//     localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));
//   };

//   const deleteSnippet = (snippetId) => {
//     const updatedSnippets = savedSnippets.filter(snippet => snippet.id !== snippetId);
//     setSavedSnippets(updatedSnippets);
//     localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));
//     addNotification("info", "Snippet deleted");
//   };

//   const shareCode = () => {
//     setIsSharing(true);
//     setTimeout(() => {
//       const shareLink = `https://algostub.com/share/${Date.now().toString(36)}`;
//       navigator.clipboard.writeText(shareLink)
//         .then(() => addNotification("success", "Share link copied to clipboard"))
//         .catch(() => addNotification("error", "Failed to copy share link"))
//         .finally(() => setIsSharing(false));
//     }, 1000);
//   };

//   const exportAsGist = () => {
//     setIsSharing(true);
//     setTimeout(() => {
//       const gistLink = `https://gist.github.com/anonymous/${Date.now().toString(36)}`;
//       navigator.clipboard.writeText(gistLink)
//         .then(() => addNotification("success", "Gist link copied to clipboard"))
//         .catch(() => addNotification("error", "Failed to copy gist link"))
//         .finally(() => setIsSharing(false));
//     }, 1000);
//   };

//   const askAiAssistant = (presetId) => {
//     setIsLoading(true);
//     addNotification("info", "AI assistant processing your code...");
//     setTimeout(() => {
//       let suggestions = [];
//       if (presetId === "optimize") {
//         suggestions = [
//           {
//             title: "Use array methods instead of loops",
//             description: "Array methods like map, filter, and reduce are more concise",
//             code: code.replace(/for\s*\(.*\)\s*\{[\s\S]*?\}/g, "// Optimized with array methods\nconst results = data.map(item => processItem(item));")
//           },
//           {
//             title: "Avoid unnecessary variables",
//             description: "Some variables in your code can be inlined",
//             code: code.replace(/const\s+(\w+)\s*=\s*(\w+)\.(\w+);/g, "// Directly access properties\n$2.$3")
//           }
//         ];
//       } else if (presetId === "debug") {
//         suggestions = [
//           {
//             title: "Add comprehensive error handling",
//             description: "Your code needs better exception handling",
//             code: "try {\n" + code + "\n} catch (error) {\n  console.error('Error executing code:', error);\n  if (error instanceof TypeError) {\n    // Handle type errors\n  } else if (error instanceof ReferenceError) {\n    // Handle reference errors\n  }\n}"
//           }
//         ];
//       } else if (presetId === "refactor") {
//         suggestions = [
//           {
//             title: "Extract repeated logic into functions",
//             description: "Identify repeated patterns and extract them",
//             code: "// Extracted helper function\nfunction processData(data) {\n  // Logic here\n  return transformedData;\n}\n\n" + code
//           }
//         ];
//       }
//       setAiSuggestions(suggestions);
//       setShowSuggestions(true);
//       setIsLoading(false);
//     }, 2000);
//   };

//   const addNotification = (type, message) => {
//     const id = Date.now();
//     setNotifications(prev => [...prev, { id, type, message }]);
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== id));
//     }, 3000);
//   };

//   const simulateOutput = (code, language) => {
//     if (code.trim() === '') return 'No code to execute';
//     switch (language) {
//       case 'javascript':
//         return 'Hello from JavaScript!\n{ result: 42, status: "success" }';
//       case 'python':
//         return 'Hello from Python!\n>>> Output: {"result": 42, "status": "success"}';
//       case 'java':
//         return 'Compiling Java code...\nHello from Java!\nOutput: {"result": 42, "status": "success"}';
//       default:
//         return `Running ${language} code...\nOutput: {"result": 42, "status": "success"}`;
//     }
//   };

//   const handleProjectNameChange = (e) => {
//     setProjectName(e.target.value);
//   };

//   const startEditingProjectName = () => {
//     setIsProjectNameEditing(true);
//   };

//   const finishEditingProjectName = () => {
//     setIsProjectNameEditing(false);
//   };

//   const downloadCode = () => {
//     const blob = new Blob([code], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${projectName}.${language}`;
//     a.click();
//     URL.revokeObjectURL(url);
//     addNotification("success", "Code downloaded successfully");
//   };

//   const uploadCode = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCode(e.target.result);
//         addNotification("success", "Code uploaded successfully");
//       };
//       reader.readAsText(file);
//     }
//   };

//   const formatCode = () => {
//     // Simulate code formatting by adding consistent indentation
//     const lines = code.split('\n').map(line => line.trim());
//     let indentLevel = 0;
//     const formatted = lines.map(line => {
//       if (line.endsWith('}') || line.endsWith(']') || line.endsWith(')')) indentLevel--;
//       const indentedLine = '  '.repeat(Math.max(0, indentLevel)) + line;
//       if (line.endsWith('{') || line.endsWith('[') || line.endsWith('(')) indentLevel++;
//       return indentedLine;
//     }).join('\n');
//     setCode(formatted);
//     addNotification("success", "Code formatted successfully");
//   };

//   const handleAutoComplete = (e) => {
//     const value = e.target.value;
//     const lastWord = value.slice(value.lastIndexOf(' ') + 1);
//     if (lastWord.length > 1) {
//       const suggestions = autoCompleteKeywords[language]
//         .filter(keyword => keyword.startsWith(lastWord))
//         .slice(0, 5);
//       setAutoCompleteSuggestions(suggestions);
//       setShowAutoComplete(suggestions.length > 0);
//     } else {
//       setShowAutoComplete(false);
//     }
//   };

//   const applyAutoComplete = (suggestion) => {
//     const lines = code.split('\n');
//     const lastLine = lines[lines.length - 1];
//     const lastWordStart = lastLine.lastIndexOf(' ') + 1;
//     const newLastLine = lastLine.slice(0, lastWordStart) + suggestion;
//     lines[lines.length - 1] = newLastLine;
//     setCode(lines.join('\n'));
//     setShowAutoComplete(false);
//     editorRef.current.focus();
//   };

//   const addTestCase = () => {
//     const newTestCase = { id: Date.now(), input: "", expectedOutput: "", passed: null };
//     setTestCases(prev => [...prev, newTestCase]);
//     localStorage.setItem('algostub_test_cases', JSON.stringify([...testCases, newTestCase]));
//   };

//   const updateTestCase = (id, field, value) => {
//     const updatedTestCases = testCases.map(tc =>
//       tc.id === id ? { ...tc, [field]: value } : tc
//     );
//     setTestCases(updatedTestCases);
//     localStorage.setItem('algostub_test_cases', JSON.stringify(updatedTestCases));
//   };

//   const deleteTestCase = (id) => {
//     const updatedTestCases = testCases.filter(tc => tc.id !== id);
//     setTestCases(updatedTestCases);
//     localStorage.setItem('algostub_test_cases', JSON.stringify(updatedTestCases));
//     addNotification("info", "Test case deleted");
//   };

//   const runTestCases = () => {
//     setIsLoading(true);
//     setTestResults([]);
//     setTimeout(() => {
//       const results = testCases.map(tc => {
//         // Simulate test case execution
//         const simulatedOutput = simulateOutput(code + '\n// Input: ' + tc.input, language);
//         const passed = simulatedOutput.includes(tc.expectedOutput);
//         return { ...tc, passed };
//       });
//       setTestResults(results);
//       setIsLoading(false);
//       addNotification("success", "Test cases executed");
//     }, 1500);
//   };

//   const startDrag = () => {
//     dragRef.current = true;
//     document.body.style.cursor = 'col-resize';
//   };

//   return (
//     <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-950 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} ${isFullscreen ? 'fixed inset-0 z-50' : ''} transition-all duration-300`}>
//       {/* Notifications */}
//       <div className="fixed top-4 right-4 z-50 space-y-2">
//         {notifications.map(notification => (
//           <div
//             key={notification.id}
//             className={`px-4 py-2 rounded-lg shadow-xl flex items-center space-x-2 animate-slide-in-right ${
//               notification.type === 'success' ? 'bg-green-600' :
//               notification.type === 'error' ? 'bg-red-600' :
//               'bg-blue-600'
//             } text-white text-sm transition-transform duration-300`}
//           >
//             {notification.type === 'success' && <CheckCircle className="h-4 w-4" />}
//             {notification.type === 'error' && <XCircle className="h-4 w-4" />}
//             {notification.type === 'info' && <AlertCircle className="h-4 w-4" />}
//             <span>{notification.message}</span>
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <header className={`px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-md">
//             <Cpu className="h-5 w-5 mr-1" />
//             <span className="font-bold text-sm">AlgoStub</span>
//           </div>
//           <div className="h-5 border-r border-gray-600 mx-1"></div>
//           {isProjectNameEditing ? (
//             <input
//               type="text"
//               value={projectName}
//               onChange={handleProjectNameChange}
//               onBlur={finishEditingProjectName}
//               onKeyDown={(e) => e.key === 'Enter' && finishEditingProjectName()}
//               className={`px-3 py-1 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-white ring-1 ring-gray-700' : 'bg-white text-gray-900 ring-1 ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//               autoFocus
//             />
//           ) : (
//             <h2
//               className="text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors duration-200"
//               onClick={startEditingProjectName}
//             >
//               {projectName}
//             </h2>
//           )}
//         </div>
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => askAiAssistant('optimize')}
//               className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
//               data-tooltip="Get AI optimization suggestions"
//             >
//               <Zap className="h-3 w-3 mr-1 text-yellow-500" />
//               AI Assist
//             </button>
//             <button
//               onClick={toggleDebugMode}
//               className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${debugMode ? 'bg-blue-600 text-white ring-1 ring-blue-500' : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
//               data-tooltip={debugMode ? "Disable debug mode" : "Enable debug mode"}
//             >
//               <Terminal className="h-3 w-3 mr-1" />
//               Debug
//             </button>
//           </div>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className={`px-3 py-1.5 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//           >
//             {languages.map(lang => (
//               <option key={lang.id} value={lang.id}>{lang.name}</option>
//             ))}
//           </select>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
//               data-tooltip={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </button>
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
//               data-tooltip="Settings"
//             >
//               <Settings className="h-5 w-5" />
//             </button>
//             <button
//               onClick={toggleFullscreen}
//               className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
//               data-tooltip={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//             >
//               {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Settings panel */}
//       {showSettings && (
//         <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-semibold text-lg">Settings</h3>
//             <button
//               onClick={() => setShowSettings(false)}
//               className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Theme</label>
//               <select
//                 value={theme}
//                 onChange={(e) => setTheme(e.target.value)}
//                 className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//               >
//                 {themes.map(t => (
//                   <option key={t.id} value={t.id}>{t.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Font Size</label>
//               <select
//                 value={fontSize}
//                 onChange={(e) => setFontSize(e.target.value)}
//                 className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//               >
//                 <option value="12px">12px</option>
//                 <option value="14px">14px</option>
//                 <option value="16px">16px</option>
//                 <option value="18px">18px</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Auto-save</label>
//               <select
//                 className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//               >
//                 <option value="off">Off</option>
//                 <option value="30s">Every 30s</option>
//                 <option value="1m">Every minute</option>
//                 <option value="5m">Every 5 minutes</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tab navigation */}
//       <div className={`flex border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
//         {['editor', 'snippets', 'history', 'testcases'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               if (tab === 'history') setShowHistory(true);
//             }}
//             className={`px-4 py-2 text-sm font-medium flex items-center space-x-1 ${activeTab === tab
//               ? isDarkMode
//                 ? 'border-b-2 border-blue-500 text-blue-400'
//                 : 'border-b-2 border-blue-600 text-blue-600'
//               : isDarkMode
//                 ? 'text-gray-400 hover:text-gray-300'
//                 : 'text-gray-600 hover:text-gray-800'} transition-all duration-200`}
//           >
//             {tab === 'editor' && <Code className="h-4 w-4" />}
//             {tab === 'snippets' && <Database className="h-4 w-4" />}
//             {tab === 'history' && <History className="h-4 w-4" />}
//             {tab === 'testcases' && <FileCode className="h-4 w-4" />}
//             <span>{tab.charAt(0).toUpperCase() + tab.slice(1).replace('testcases', 'Test Cases')}</span>
//           </button>
//         ))}
//       </div>

//       {/* Main content area */}
//       {activeTab === "editor" ? (
//         <div className="flex flex-1 overflow-hidden relative">
//           {/* Code editor */}
//           <div className="flex flex-col" style={{ width: `${editorWidth}%` }}>
//             <div className={`p-2 flex justify-between items-center ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} backdrop-blur-sm shadow-sm`}>
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs font-medium">Editor</span>
//                 <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
//                   {languages.find(l => l.id === language)?.name || 'Code'}
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={formatCode}
//                   className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Format code"
//                 >
//                   <AlignLeft className="h-4 w-4" />
//                 </button>
//                 <label className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} cursor-pointer transition-all duration-200`} data-tooltip="Upload code">
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={uploadCode}
//                     accept={`.${language}`}
//                   />
//                   <Upload className="h-4 w-4" />
//                 </label>
//                 <button
//                   onClick={saveCode}
//                   className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Save code"
//                 >
//                   <Save className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={downloadCode}
//                   className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Download code"
//                 >
//                   <Download className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={shareCode}
//                   className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Share code"
//                   disabled={isSharing}
//                 >
//                   <Share2 className={`h-4 w-4 ${isSharing ? 'animate-pulse' : ''}`} />
//                 </button>
//                 <button
//                   onClick={exportAsGist}
//                   className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Export as Gist"
//                   disabled={isSharing}
//                 >
//                   <GitBranch className={`h-4 w-4 ${isSharing ? 'animate-pulse' : ''}`} />
//                 </button>
//               </div>
//             </div>
//             <div className="relative flex-1">
//               <div className={`absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end pr-2 pt-4 text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-600' : 'bg-gray-100 text-gray-400'}`}>
//                 {Array.from({ length: (code.match(/\n/g) || []).length + 1 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-6 cursor-pointer flex items-center ${errorLines.includes(i + 1) ? 'text-red-400' : ''}`}
//                     onClick={() => addBreakpoint(i + 1)}
//                   >
//                     {breakpoints.includes(i + 1) && <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>}
//                     {i + 1}
//                   </div>
//                 ))}
//               </div>
//               <textarea
//                 ref={editorRef}
//                 value={code}
//                 onChange={(e) => { setCode(e.target.value); handleAutoComplete(e); }}
//                 style={{
//                   paddingLeft: '2.5rem',
//                   fontSize: fontSize,
//                   lineHeight: '1.5',
//                   fontFamily: 'Menlo, Monaco, "Courier New", monospace'
//                 }}
//                 className={`w-full h-full p-4 resize-none outline-none ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//                 placeholder={`Write your ${languages.find(l => l.id === language)?.name || 'code'} here...`}
//                 spellCheck="false"
//               />
//               {showAutoComplete && autoCompleteSuggestions.length > 0 && (
//                 <div className={`absolute left-12 bottom-4 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} z-10`}>
//                   {autoCompleteSuggestions.map((suggestion, index) => (
//                     <div
//                       key={index}
//                       className={`px-3 py-1.5 text-sm cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
//                       onClick={() => applyAutoComplete(suggestion)}
//                     >
//                       {suggestion}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* Resizable divider */}
//           <div
//             className="w-2 bg-gray-700 cursor-col-resize hover:bg-blue-500 transition-colors duration-200"
//             onMouseDown={startDrag}
//           ></div>
//           {/* Output panel */}
//           <div className="flex-1 flex flex-col">
//             <div className={`p-2 flex justify-between items-center ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} backdrop-blur-sm shadow-sm`}>
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs font-medium">Output</span>
//                 {executionTime && (
//                   <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
//                     <Clock className="h-3 w-3 inline mr-1" />
//                     {executionTime}ms
//                   </div>
//                 )}
//                 {memoryUsage && (
//                   <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
//                     <Database className="h-3 w-3 inline mr-1" />
//                     {memoryUsage}
//                   </div>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={compileCode}
//                   disabled={isLoading}
//                   className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${isLoading
//                     ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//                   data-tooltip="Run code"
//                 >
//                   <Play className="h-3 w-3" />
//                   <span className="text-xs">Run</span>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 overflow-auto">
//               <pre className={`p-4 font-mono text-sm whitespace-pre-wrap ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
//                 {output || 'No output yet. Click "Run" to execute your code.'}
//               </pre>
//             </div>
//             {/* AI Suggestions */}
//             {showSuggestions && aiSuggestions.length > 0 && (
//               <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-sm">AI Suggestions</h3>
//                   <button
//                     onClick={() => setShowSuggestions(false)}
//                     className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
//                   >
//                     ×
//                   </button>
//                 </div>
//                 <div className="space-y-3">
//                   {aiSuggestions.map((suggestion, index) => (
//                     <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-medium text-sm">{suggestion.title}</h4>
//                           <p className="text-xs text-gray-400">{suggestion.description}</p>
//                         </div>
//                         <button
//                           onClick={() => applySuggestion(suggestion)}
//                           className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                       <pre className={`mt-2 p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
//                         {suggestion.code}
//                       </pre>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : activeTab === "snippets" ? (
//         <div className="flex-1 overflow-auto p-4">
//           <h3 className="text-lg font-semibold mb-4">Saved Snippets</h3>
//           {savedSnippets.length === 0 ? (
//             <p className="text-gray-500">No saved snippets yet.</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4">
//               {savedSnippets.map(snippet => (
//                 <div
//                   key={snippet.id}
//                   className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center space-x-2">
//                       <h4 className="font-medium">{snippet.name}</h4>
//                       <span className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-600' : 'ring-gray-300'}`}>
//                         {languages.find(l => l.id === snippet.language)?.name}
//                       </span>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => toggleFavorite(snippet.id)}
//                         className="p-1"
//                         data-tooltip={snippet.favorite ? "Remove favorite" : "Mark as favorite"}
//                       >
//                         <Star className={`h-4 w-4 ${snippet.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
//                       </button>
//                       <button
//                         onClick={() => loadSnippet(snippet)}
//                         className="p-1"
//                         data-tooltip="Load snippet"
//                       >
//                         <FileText className="h-4 w-4 text-gray-400" />
//                       </button>
//                       <button
//                         onClick={() => deleteSnippet(snippet.id)}
//                         className="p-1"
//                         data-tooltip="Delete snippet"
//                       >
//                         <XCircle className="h-4 w-4 text-red-400" />
//                       </button>
//                     </div>
//                   </div>
//                   <pre className={`p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
//                     {snippet.code.slice(0, 100) + (snippet.code.length > 100 ? '...' : '')}
//                   </pre>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Saved: {new Date(snippet.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : activeTab === "history" ? (
//         <div className="flex-1 overflow-auto p-4">
//           <h3 className="text-lg font-semibold mb-4">Execution History</h3>
//           {codeHistory.length === 0 ? (
//             <p className="text-gray-500">No execution history yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {codeHistory.map(history => (
//                 <div
//                   key={history.id}
//                   className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center space-x-2">
//                       <span className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-600' : 'ring-gray-300'}`}>
//                         {languages.find(l => l.id === history.language)?.name}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         {new Date(history.timestamp).toLocaleString()}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => {
//                         setCode(history.code);
//                         setLanguage(history.language);
//                         setActiveTab("editor");
//                       }}
//                       className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
//                     >
//                       Load
//                     </button>
//                   </div>
//                   <pre className={`p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
//                     {history.code.slice(0, 100) + (history.code.length > 100 ? '...' : '')}
//                   </pre>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex-1 overflow-auto p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Test Cases</h3>
//             <button
//               onClick={addTestCase}
//               className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
//             >
//               Add Test Case
//             </button>
//           </div>
//           {testCases.length === 0 ? (
//             <p className="text-gray-500">No test cases defined yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {testCases.map((tc, index) => (
//                 <div
//                   key={tc.id}
//                   className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="font-medium">Test Case {index + 1}</h4>
//                     <button
//                       onClick={() => deleteTestCase(tc.id)}
//                       className="p-1"
//                       data-tooltip="Delete test case"
//                     >
//                       <XCircle className="h-4 w-4 text-red-400" />
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Input</label>
//                       <textarea
//                         value={tc.input}
//                         onChange={(e) => updateTestCase(tc.id, 'input', e.target.value)}
//                         className={`w-full p-2 rounded-lg text-sm ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//                         rows="3"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Expected Output</label>
//                       <textarea
//                         value={tc.expectedOutput}
//                         onChange={(e) => updateTestCase(tc.id, 'expectedOutput', e.target.value)}
//                         className={`w-full p-2 rounded-lg text-sm ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
//                         rows="3"
//                       />
//                     </div>
//                   </div>
//                   {testResults.find(result => result.id === tc.id) && (
//                     <div className="mt-2 text-sm">
//                       <span className={testResults.find(result => result.id === tc.id).passed ? 'text-green-500' : 'text-red-500'}>
//                         {testResults.find(result => result.id === tc.id).passed ? 'Passed' : 'Failed'}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <button
//                 onClick={runTestCases}
//                 disabled={isLoading}
//                 className={`mt-4 px-4 py-2 rounded-lg flex items-center space-x-1 ${isLoading
//                   ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700 text-white'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
//               >
//                 <Play className="h-4 w-4" />
//                 <span>Run Test Cases</span>
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//       <style jsx>{`
//         @keyframes slide-in-right {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-in-right {
//           animation: slide-in-right 0.3s ease-out;
//         }
//         @media (max-width: 768px) {
//           .flex-1 > div:first-child {
//             width: 100% !important;
//           }
//           .flex-1 > div:nth-child(2) {
//             display: none;
//           }
//           .flex-1 > div:last-child {
//             width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default AlgoStubCompiler;



'use client';
import { useState, useEffect, useRef } from "react";
import {
  Maximize2, Minimize2, Play, Save, Download, Upload, Code,
  Settings, Moon, Sun, AlertCircle, Share2, Clock, Star,
  History, FileText, Terminal, Database, Lock, ChevronDown,
  Coffee, Zap, Book, CheckCircle, XCircle, GitBranch,
  BarChart2, Cpu, Cloud, AlignLeft, FileCode, Volume2,
  VolumeX, Music
} from "lucide-react";
import { FooterSection } from "../components/footer/FooterSection";

function AlgoStubCompiler() {
  // Existing state management...
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState("14px");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [codeHistory, setCodeHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [breakpoints, setBreakpoints] = useState([]);
  const [errorLines, setErrorLines] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [isProjectNameEditing, setIsProjectNameEditing] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [editorWidth, setEditorWidth] = useState(50);
  
  // New music mode states
  const [isMusicMode, setIsMusicMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioWaveform, setAudioWaveform] = useState([]);

  // Refs
  const editorRef = useRef(null);
  const dragRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  // Existing languages and other configurations...
  const languages = [
    { id: "javascript", name: "JavaScript", icon: "js" },
    { id: "python", name: "Python", icon: "py" },
    { id: "java", name: "Java", icon: "java" },
    { id: "cpp", name: "C++", icon: "cpp" },
    { id: "ruby", name: "Ruby", icon: "rb" },
    { id: "go", name: "Go", icon: "go" },
    { id: "rust", name: "Rust", icon: "rs" },
    { id: "typescript", name: "TypeScript", icon: "ts" },
    { id: "php", name: "PHP", icon: "php" },
    { id: "csharp", name: "C#", icon: "cs" }
  ];

  const themes = [
    { id: "monokai", name: "Monokai" },
    { id: "github", name: "GitHub" },
    { id: "tomorrow_night", name: "Tomorrow Night" },
    { id: "dracula", name: "Dracula" },
    { id: "solarized_dark", name: "Solarized Dark" },
    { id: "solarized_light", name: "Solarized Light" }
  ];

  const aiPresets = [
    { id: "optimize", name: "Optimize Code", description: "Make your code faster and more efficient" },
    { id: "debug", name: "Debug Code", description: "Find and fix errors in your code" },
    { id: "refactor", name: "Refactor Code", description: "Improve code structure and readability" },
    { id: "explain", name: "Explain Code", description: "Get a detailed explanation of what your code does" },
    { id: "security", name: "Security Check", description: "Find potential security vulnerabilities" }
  ];

  const autoCompleteKeywords = {
    javascript: ["function", "const", "let", "var", "if", "else", "return", "for", "while", "class"],
    python: ["def", "class", "if", "else", "elif", "for", "while", "return", "import", "try"],
    java: ["public", "class", "static", "void", "int", "String", "if", "else", "for", "while"],
    cpp: ["int", "void", "class", "public", "private", "for", "while", "if", "else", "return"],
    ruby: ["def", "class", "if", "else", "end", "for", "while", "return", "module", "require"],
    go: ["func", "package", "import", "if", "else", "for", "return", "var", "const", "type"],
    rust: ["fn", "let", "mut", "if", "else", "for", "while", "return", "struct", "impl"],
    typescript: ["function", "const", "let", "interface", "type", "if", "else", "for", "while", "return"],
    php: ["function", "class", "public", "private", "if", "else", "for", "while", "return", "echo"],
    csharp: ["public", "class", "static", "void", "int", "string", "if", "else", "for", "while"]
  };

  // Music mode demo audio (using a public domain audio URL)
  const demoAudioUrl = "https://www.kozco.com/tech/piano2.wav";

  // Initialize music mode
  useEffect(() => {
    audioRef.current = new Audio(demoAudioUrl);
    audioRef.current.volume = volume;

    const updateProgress = () => {
      if (audioRef.current) {
        setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    const generateWaveform = () => {
      // Simulate waveform data
      const waveformData = Array.from({ length: 50 }, () => Math.random() * 100);
      setAudioWaveform(waveformData);
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('playing', generateWaveform);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('playing', generateWaveform);
      }
    };
  }, []);

  // Draw waveform visualization
  useEffect(() => {
    if (isMusicMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      const drawWaveform = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = isDarkMode ? '#60A5FA' : '#2563EB';
        ctx.lineWidth = 2;

        audioWaveform.forEach((value, index) => {
          const x = (index / audioWaveform.length) * width;
          const y = (value / 100) * height * 0.5 + height / 2;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.stroke();
        if (isPlaying) {
          requestAnimationFrame(drawWaveform);
        }
      };

      drawWaveform();
    }
  }, [isMusicMode, isPlaying, audioWaveform, isDarkMode]);

  // Existing useEffect hooks...
  useEffect(() => {
    const savedSettings = localStorage.getItem('algostub_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLanguage(settings.language || "javascript");
      setTheme(settings.theme || "monokai");
      setFontSize(settings.fontSize || "14px");
      setIsDarkMode(settings.isDarkMode !== undefined ? settings.isDarkMode : true);
    }

    const savedSnippetsData = localStorage.getItem('algostub_snippets');
    if (savedSnippetsData) {
      setSavedSnippets(JSON.parse(savedSnippetsData));
    }

    const savedTestCases = localStorage.getItem('algostub_test_cases');
    if (savedTestCases) {
      setTestCases(JSON.parse(savedTestCases));
    }

    setAiSuggestions([
      {
        title: "Optimize your loop structure",
        description: "Using map() instead of for loop could improve readability",
        code: "// Optimized version\nconst results = data.map(item => item.value * 2);"
      },
      {
        title: "Consider adding error handling",
        description: "Your code might throw errors without proper try/catch blocks",
        code: "try {\n  // Your existing code\n} catch (error) {\n  console.error('An error occurred:', error);\n}"
      }
    ]);
  }, []);

  useEffect(() => {
    const settings = { language, theme, fontSize, isDarkMode };
    localStorage.setItem('algostub_settings', JSON.stringify(settings));
  }, [language, theme, fontSize, isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragRef.current) {
        const containerWidth = document.querySelector('.flex-1').offsetWidth;
        const newWidth = (e.clientX / containerWidth) * 100;
        if (newWidth >= 30 && newWidth <= 70) {
          setEditorWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const compileCode = async () => {
    setIsLoading(true);
    setOutput("");
    setErrorLines([]);

    const historyItem = {
      id: Date.now(),
      code,
      language,
      timestamp: new Date().toISOString()
    };
    setCodeHistory(prevHistory => [historyItem, ...prevHistory]);

    const startTime = performance.now();

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, debugMode, breakpoints }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
        setExecutionTime((performance.now() - startTime).toFixed(2));
        setMemoryUsage(data.memoryUsage || "2.4 MB");

        if (data.suggestions && data.suggestions.length > 0) {
          setAiSuggestions(data.suggestions);
          setShowSuggestions(true);
        }

        addNotification("success", "Code executed successfully");
      } else {
        setOutput(`Error: ${data.error}`);
        setErrorLines(data.errorLines || [1]);
        addNotification("error", "Execution failed: " + data.error);
      }
    } catch (error) {
      setTimeout(() => {
        const demoOutput = `Running ${language} code...\n\n// Output:\n${simulateOutput(code, language)}`;
        setOutput(demoOutput);
        setExecutionTime((performance.now() - startTime).toFixed(2));
        setMemoryUsage("2.4 MB");
        addNotification("success", "Code executed successfully");
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCode = async () => {
    try {
      const snippetId = Date.now().toString();
      const newSnippet = {
        id: snippetId,
        name: projectName,
        language,
        code,
        createdAt: new Date().toISOString(),
        favorite: false
      };

      setSavedSnippets(prev => [newSnippet, ...prev]);
      const updatedSnippets = [newSnippet, ...savedSnippets];
      localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));

      addNotification("success", "Code saved successfully");
    } catch (error) {
      addNotification("error", "Error saving code");
    }
  };

  const applySuggestion = (suggestion) => {
    setCode(suggestion.code);
    setShowSuggestions(false);
    addNotification("info", "AI suggestion applied");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
    addNotification("info", debugMode ? "Debug mode disabled" : "Debug mode enabled");
  };

  const toggleMusicMode = () => {
    setIsMusicMode(!isMusicMode);
    if (!isMusicMode && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    addNotification("info", isMusicMode ? "Music mode disabled" : "Music mode enabled");
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const addBreakpoint = (lineNumber) => {
    if (breakpoints.includes(lineNumber)) {
      setBreakpoints(breakpoints.filter(bp => bp !== lineNumber));
    } else {
      setBreakpoints([...breakpoints, lineNumber]);
    }
  };

  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setProjectName(snippet.name);
    addNotification("info", `Loaded: ${snippet.name}`);
  };

  const toggleFavorite = (snippetId) => {
    const updatedSnippets = savedSnippets.map(snippet =>
      snippet.id === snippetId ? { ...snippet, favorite: !snippet.favorite } : snippet
    );
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));
  };

  const deleteSnippet = (snippetId) => {
    const updatedSnippets = savedSnippets.filter(snippet => snippet.id !== snippetId);
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('algostub_snippets', JSON.stringify(updatedSnippets));
    addNotification("info", "Snippet deleted");
  };

  const shareCode = () => {
    setIsSharing(true);
    setTimeout(() => {
      const shareLink = `https://algostub.com/share/${Date.now().toString(36)}`;
      navigator.clipboard.writeText(shareLink)
        .then(() => addNotification("success", "Share link copied to clipboard"))
        .catch(() => addNotification("error", "Failed to copy share link"))
        .finally(() => setIsSharing(false));
    }, 1000);
  };

  const exportAsGist = () => {
    setIsSharing(true);
    setTimeout(() => {
      const gistLink = `https://gist.github.com/anonymous/${Date.now().toString(36)}`;
      navigator.clipboard.writeText(gistLink)
        .then(() => addNotification("success", "Gist link copied to clipboard"))
        .catch(() => addNotification("error", "Failed to copy gist link"))
        .finally(() => setIsSharing(false));
    }, 1000);
  };

  const askAiAssistant = (presetId) => {
    setIsLoading(true);
    addNotification("info", "AI assistant processing your code...");
    setTimeout(() => {
      let suggestions = [];
      if (presetId === "optimize") {
        suggestions = [
          {
            title: "Use array methods instead of loops",
            description: "Array methods like map, filter, and reduce are more concise",
            code: code.replace(/for\s*\(.*\)\s*\{[\s\S]*?\}/g, "// Optimized with array methods\nconst results = data.map(item => processItem(item));")
          },
          {
            title: "Avoid unnecessary variables",
            description: "Some variables in your code can be inlined",
            code: code.replace(/const\s+(\w+)\s*=\s*(\w+)\.(\w+);/g, "// Directly access properties\n$2.$3")
          }
        ];
      } else if (presetId === "debug") {
        suggestions = [
          {
            title: "Add comprehensive error handling",
            description: "Your code needs better exception handling",
            code: "try {\n" + code + "\n} catch (error) {\n  console.error('Error executing code:', error);\n  if (error instanceof TypeError) {\n    // Handle type errors\n  } else if (error instanceof ReferenceError) {\n    // Handle reference errors\n  }\n}"
          }
        ];
      } else if (presetId === "refactor") {
        suggestions = [
          {
            title: "Extract repeated logic into functions",
            description: "Identify repeated patterns and extract them",
            code: "// Extracted helper function\nfunction processData(data) {\n  // Logic here\n  return transformedData;\n}\n\n" + code
          }
        ];
      }
      setAiSuggestions(suggestions);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 2000);
  };

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const simulateOutput = (code, language) => {
    if (code.trim() === '') return 'No code to execute';
    switch (language) {
      case 'javascript':
        return 'Hello from JavaScript!\n{ result: 42, status: "success" }';
      case 'python':
        return 'Hello from Python!\n>>> Output: {"result": 42, "status": "success"}';
      case 'java':
        return 'Compiling Java code...\nHello from Java!\nOutput: {"result": 42, "status": "success"}';
      default:
        return `Running ${language} code...\nOutput: {"result": 42, "status": "success"}`;
    }
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const startEditingProjectName = () => {
    setIsProjectNameEditing(true);
  };

  const finishEditingProjectName = () => {
    setIsProjectNameEditing(false);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.${language}`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification("success", "Code downloaded successfully");
  };

  const uploadCode = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        addNotification("success", "Code uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  const formatCode = () => {
    const lines = code.split('\n').map(line => line.trim());
    let indentLevel = 0;
    const formatted = lines.map(line => {
      if (line.endsWith('}') || line.endsWith(']') || line.endsWith(')')) indentLevel--;
      const indentedLine = '  '.repeat(Math.max(0, indentLevel)) + line;
      if (line.endsWith('{') || line.endsWith('[') || line.endsWith('(')) indentLevel++;
      return indentedLine;
    }).join('\n');
    setCode(formatted);
    addNotification("success", "Code formatted successfully");
  };

  const handleAutoComplete = (e) => {
    const value = e.target.value;
    const lastWord = value.slice(value.lastIndexOf(' ') + 1);
    if (lastWord.length > 1) {
      const suggestions = autoCompleteKeywords[language]
        .filter(keyword => keyword.startsWith(lastWord))
        .slice(0, 5);
      setAutoCompleteSuggestions(suggestions);
      setShowAutoComplete(suggestions.length > 0);
    } else {
      setShowAutoComplete(false);
    }
  };

  const applyAutoComplete = (suggestion) => {
    const lines = code.split('\n');
    const lastLine = lines[lines.length - 1];
    const lastWordStart = lastLine.lastIndexOf(' ') + 1;
    const newLastLine = lastLine.slice(0, lastWordStart) + suggestion;
    lines[lines.length - 1] = newLastLine;
    setCode(lines.join('\n'));
    setShowAutoComplete(false);
    editorRef.current.focus();
  };

  const addTestCase = () => {
    const newTestCase = { id: Date.now(), input: "", expectedOutput: "", passed: null };
    setTestCases(prev => [...prev, newTestCase]);
    localStorage.setItem('algostub_test_cases', JSON.stringify([...testCases, newTestCase]));
  };

  const updateTestCase = (id, field, value) => {
    const updatedTestCases = testCases.map(tc =>
      tc.id === id ? { ...tc, [field]: value } : tc
    );
    setTestCases(updatedTestCases);
    localStorage.setItem('algostub_test_cases', JSON.stringify(updatedTestCases));
  };

  const deleteTestCase = (id) => {
    const updatedTestCases = testCases.filter(tc => tc.id !== id);
    setTestCases(updatedTestCases);
    localStorage.setItem('algostub_test_cases', JSON.stringify(updatedTestCases));
    addNotification("info", "Test case deleted");
  };

  const runTestCases = () => {
    setIsLoading(true);
    setTestResults([]);
    setTimeout(() => {
      const results = testCases.map(tc => {
        const simulatedOutput = simulateOutput(code + '\n// Input: ' + tc.input, language);
        const passed = simulatedOutput.includes(tc.expectedOutput);
        return { ...tc, passed };
      });
      setTestResults(results);
      setIsLoading(false);
      addNotification("success", "Test cases executed");
    }, 1500);
  };

  const startDrag = () => {
    dragRef.current = true;
    document.body.style.cursor = 'col-resize';
  };

  return (
    <>
      <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-950 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} ${isFullscreen ? 'fixed inset-0 z-50' : ''} transition-all duration-300`}>
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`px-4 py-2 rounded-lg shadow-xl flex items-center space-x-2 animate-slide-in-right ${notification.type === 'success' ? 'bg-green-600' :
                notification.type === 'error' ? 'bg-red-600' :
                  'bg-blue-600'
                } text-white text-sm transition-transform duration-300`}
            >
              {notification.type === 'success' && <CheckCircle className="h-4 w-4" />}
              {notification.type === 'error' && <XCircle className="h-4 w-4" />}
              {notification.type === 'info' && <AlertCircle className="h-4 w-4" />}
              <span>{notification.message}</span>
            </div>
          ))}
        </div>

        <header className={`px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-md">
              <Cpu className="h-5 w-5 mr-1" />
              <span className="font-bold text-sm">AlgoStub</span>
            </div>
            <div className="h-5 border-r border-gray-600 mx-1"></div>
            {isProjectNameEditing ? (
              <input
                type="text"
                value={projectName}
                onChange={handleProjectNameChange}
                onBlur={finishEditingProjectName}
                onKeyDown={(e) => e.key === 'Enter' && finishEditingProjectName()}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-white ring-1 ring-gray-700' : 'bg-white text-gray-900 ring-1 ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                autoFocus
              />
            ) : (
              <h2
                className="text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={startEditingProjectName}
              >
                {projectName}
              </h2>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => askAiAssistant('optimize')}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
                data-tooltip="Get AI optimization suggestions"
              >
                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                AI Assist
              </button>
              <button
                onClick={toggleDebugMode}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${debugMode ? 'bg-blue-600 text-white ring-1 ring-blue-500' : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
                data-tooltip={debugMode ? "Disable debug mode" : "Enable debug mode"}
              >
                <Terminal className="h-3 w-3 mr-1" />
                Debug
              </button>
              <button
                onClick={toggleMusicMode}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs ${isMusicMode ? 'bg-purple-600 text-white ring-1 ring-purple-500' : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-purple-500 transition-all duration-200`}
                data-tooltip={isMusicMode ? "Disable music mode" : "Enable music mode"}
              >
                <Music className="h-3 w-3 mr-1" />
                Music
              </button>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-3 py-1.5 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
                data-tooltip={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
                data-tooltip="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} hover:ring-blue-500 transition-all duration-200`}
                data-tooltip={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {showSettings && (
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                >
                  {themes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Auto-save</label>
                <select
                  className={`w-full px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                >
                  <option value="off">Off</option>
                  <option value="30s">Every 30s</option>
                  <option value="1m">Every minute</option>
                  <option value="5m">Every 5 minutes</option>
                </select>
              </div>
            </div>
            {isMusicMode && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Music Volume</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                  <span className="text-sm">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`flex border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
          {['editor', 'snippets', 'history', 'testcases'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'history') setShowHistory(true);
              }}
              className={`px-4 py-2 text-sm font-medium flex items-center space-x-1 ${activeTab === tab
                ? isDarkMode
                  ? 'border-b-2 border-blue-500 text-blue-400'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : isDarkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'} transition-all duration-200`}
            >
              {tab === 'editor' && <Code className="h-4 w-4" />}
              {tab === 'snippets' && <Database className="h-4 w-4" />}
              {tab === 'history' && <History className="h-4 w-4" />}
              {tab === 'testcases' && <FileCode className="h-4 w-4" />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1).replace('testcases', 'Test Cases')}</span>
            </button>
          ))}
        </div>

        {activeTab === "editor" ? (
          <div className="flex flex-1 overflow-hidden relative">
            <div className="flex flex-col" style={{ width: `${editorWidth}%` }}>
              <div className={`p-2 flex justify-between items-center ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} backdrop-blur-sm shadow-sm`}>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium">Editor</span>
                  <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
                    {languages.find(l => l.id === language)?.name || 'Code'}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={formatCode}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Format code"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  <label className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} cursor-pointer transition-all duration-200`} data-tooltip="Upload code">
                    <input
                      type="file"
                      className="hidden"
                      onChange={uploadCode}
                      accept={`.${language}`}
                    />
                    <Upload className="h-4 w-4" />
                  </label>
                  <button
                    onClick={saveCode}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Save code"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={downloadCode}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Download code"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={shareCode}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Share code"
                    disabled={isSharing}
                  >
                    <Share2 className={`h-4 w-4 ${isSharing ? 'animate-pulse' : ''}`} />
                  </button>
                  <button
                    onClick={exportAsGist}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-gray-400 hover:text-gray-100 ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Export as Gist"
                    disabled={isSharing}
                  >
                    <GitBranch className={`h-4 w-4 ${isSharing ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                <div className={`absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end pr-2 pt-4 text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-600' : 'bg-gray-100 text-gray-400'}`}>
                  {Array.from({ length: (code.match(/\n/g) || []).length + 1 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 cursor-pointer flex items-center ${errorLines.includes(i + 1) ? 'text-red-400' : ''}`}
                      onClick={() => addBreakpoint(i + 1)}
                    >
                      {breakpoints.includes(i + 1) && <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>}
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => { setCode(e.target.value); handleAutoComplete(e); }}
                  style={{
                    paddingLeft: '2.5rem',
                    fontSize: fontSize,
                    lineHeight: '1.5',
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace'
                  }}
                  className={`w-full h-full p-4 resize-none outline-none ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                  placeholder={`Write your ${languages.find(l => l.id === language)?.name || 'code'} here...`}
                  spellCheck="false"
                />
                {showAutoComplete && autoCompleteSuggestions.length > 0 && (
                  <div className={`absolute left-12 bottom-4 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} z-10`}>
                    {autoCompleteSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1.5 text-sm cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                        onClick={() => applyAutoComplete(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="w-2 bg-gray-700 cursor-col-resize hover:bg-blue-500 transition-colors duration-200"
              onMouseDown={startDrag}
            ></div>
            <div className="flex-1 flex flex-col">
              <div className={`p-2 flex justify-between items-center ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} backdrop-blur-sm shadow-sm`}>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium">Output</span>
                  {executionTime && (
                    <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
                      <Clock className="h-3 w-3 inline mr-1" />
                      {executionTime}ms
                    </div>
                  )}
                  {memoryUsage && (
                    <div className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}>
                      <Database className="h-3 w-3 inline mr-1" />
                      {memoryUsage}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={compileCode}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${isLoading
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    data-tooltip="Run code"
                  >
                    <Play className="h-3 w-3" />
                    <span className="text-xs">Run</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <pre className={`p-4 font-mono text-sm whitespace-pre-wrap ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
                  {output || 'No output yet. Click "Run" to execute your code.'}
                </pre>
              </div>
              {isMusicMode && (
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-sm">Music Player</h3>
                    <button
                      onClick={togglePlayPause}
                      className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                    >
                      {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="relative h-16">
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center">
                      <div
                        className="h-1 bg-blue-500"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {showSuggestions && aiSuggestions.length > 0 && (
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm shadow-sm`}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-sm">AI Suggestions</h3>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">{suggestion.title}</h4>
                            <p className="text-xs text-gray-400">{suggestion.description}</p>
                          </div>
                          <button
                            onClick={() => applySuggestion(suggestion)}
                            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
                          >
                            Apply
                          </button>
                        </div>
                        <pre className={`mt-2 p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
                          {suggestion.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "snippets" ? (
          <div className="flex-1 overflow-auto p-4">
            <h3 className="text-lg font-semibold mb-4">Saved Snippets</h3>
            {savedSnippets.length === 0 ? (
              <p className="text-gray-500">No saved snippets yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {savedSnippets.map(snippet => (
                  <div
                    key={snippet.id}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{snippet.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-600' : 'ring-gray-300'}`}>
                          {languages.find(l => l.id === snippet.language)?.name}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(snippet.id)}
                          className="p-1"
                          data-tooltip={snippet.favorite ? "Remove favorite" : "Mark as favorite"}
                        >
                          <Star className={`h-4 w-4 ${snippet.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                        </button>
                        <button
                          onClick={() => loadSnippet(snippet)}
                          className="p-1"
                          data-tooltip="Load snippet"
                        >
                          <FileText className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => deleteSnippet(snippet.id)}
                          className="p-1"
                          data-tooltip="Delete snippet"
                        >
                          <XCircle className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                    <pre className={`p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
                      {snippet.code.slice(0, 100) + (snippet.code.length > 100 ? '...' : '')}
                    </pre>
                    <p className="text-xs text-gray-500 mt-2">
                      Saved: {new Date(snippet.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "history" ? (
          <div className="flex-1 overflow-auto p-4">
            <h3 className="text-lg font-semibold mb-4">Execution History</h3>
            {codeHistory.length === 0 ? (
              <p className="text-gray-500">No execution history yet.</p>
            ) : (
              <div className="space-y-4">
                {codeHistory.map(history => (
                  <div
                    key={history.id}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ring-1 ${isDarkMode ? 'ring-gray-600' : 'ring-gray-300'}`}>
                          {languages.find(l => l.id === history.language)?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(history.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCode(history.code);
                          setLanguage(history.language);
                          setActiveTab("editor");
                        }}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
                      >
                        Load
                      </button>
                    </div>
                    <pre className={`p-2 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'}`}>
                      {history.code.slice(0, 100) + (history.code.length > 100 ? '...' : '')}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Test Cases</h3>
              <button
                onClick={addTestCase}
                className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg ring-1 ring-blue-500 transition-all duration-200"
              >
                Add Test Case
              </button>
            </div>
            {testCases.length === 0 ? (
              <p className="text-gray-500">No test cases defined yet.</p>
            ) : (
              <div className="space-y-4">
                {testCases.map((tc, index) => (
                  <div
                    key={tc.id}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} shadow-sm`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Test Case {index + 1}</h4>
                      <button
                        onClick={() => deleteTestCase(tc.id)}
                        className="p-1"
                        data-tooltip="Delete test case"
                      >
                        <XCircle className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Input</label>
                        <textarea
                          value={tc.input}
                          onChange={(e) => updateTestCase(tc.id, 'input', e.target.value)}
                          className={`w-full p-2 rounded-lg text-sm ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Expected Output</label>
                        <textarea
                          value={tc.expectedOutput}
                          onChange={(e) => updateTestCase(tc.id, 'expectedOutput', e.target.value)}
                          className={`w-full p-2 rounded-lg text-sm ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ring-1 ${isDarkMode ? 'ring-gray-800' : 'ring-gray-200'} focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                          rows="3"
                        />
                      </div>
                    </div>
                    {testResults.find(result => result.id === tc.id) && (
                      <div className="mt-2 text-sm">
                        <span className={testResults.find(result => result.id === tc.id).passed ? 'text-green-500' : 'text-red-500'}>
                          {testResults.find(result => result.id === tc.id).passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={runTestCases}
                  disabled={isLoading}
                  className={`mt-4 px-4 py-2 rounded-lg flex items-center space-x-1 ${isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'} ring-1 ${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'} transition-all duration-200`}
                >
                  <Play className="h-4 w-4" />
                  <span>Run Test Cases</span>
                </button>
              </div>
            )}
          </div>
        )}
        <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        @media (max-width: 768px) {
          .flex-1 > div:first-child {
            width: 100% !important;
          }
          .flex-1 > div:nth-child(2) {
            display: none;
          }
          .flex-1 > div:last-child {
            width: 100% !important;
          }
        }
      `}</style>
      </div>
      <FooterSection />
    </>
  );
};

export default AlgoStubCompiler;