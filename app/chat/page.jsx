"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Send, Bot, Trash2, Settings, Code, ArrowLeft, ArrowRight, Sparkles, PanelLeft, Sun, Moon, Download, Search, ThumbsUp, ThumbsDown, Copy, Share2, Check, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { toast, Toaster } from "sonner";
import { FooterSection } from "../components/footer/FooterSection";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import WelcomeHandler from "../components/WelcomeHandler";

// Emoji avatar generator function
const generateEmojiAvatar = (userId) => {
    // List of tech/coding related emojis
    const techEmojis = ["👩‍💻", "👨‍💻", "🧑‍💻", "⚡", "🚀", "💻", "🔍", "🧠", "🔮", "🤖", "🌐", "💡"];

    // Use the user ID to deterministically select an emoji
    const charSum = userId?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
    const emojiIndex = charSum % techEmojis.length;

    return techEmojis[emojiIndex];
};

// Code detection and syntax highlighting
const detectAndHighlightCode = (content) => {
    // Simple regex to detect code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;

    if (!codeBlockRegex.test(content)) {
        return { isCode: false, content };
    }

    // Replace code blocks with highlighted code
    const highlightedContent = content.replace(codeBlockRegex, (match, language, code) => {
        const lang = language || 'javascript';
        try {
            const highlighted = Prism.highlight(
                code,
                Prism.languages[lang] || Prism.languages.javascript,
                lang
            );
            return `<pre class="language-${lang} rounded-md p-4 my-2 bg-gray-900 overflow-x-auto"><code class="language-${lang}">${highlighted}</code></pre>`;
        } catch (error) {
            return match;
        }
    });

    return { isCode: true, content: highlightedContent };
};

export default function Chat() {
    const { user, isLoaded } = useUser();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const endOfMessagesRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [userEmoji, setUserEmoji] = useState("👨‍💻");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [messageReactions, setMessageReactions] = useState({});
    const [copiedMessageId, setCopiedMessageId] = useState(null);
    const [isExpanded, setIsExpanded] = useState(true);

    // Generate user emoji based on user ID when loaded
    useEffect(() => {
        if (isLoaded && user) {
            setUserEmoji(generateEmojiAvatar(user.id));
        }
    }, [isLoaded, user]);

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setShowSidebar(false);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Initialize Prism for syntax highlighting
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, [messages]);

    // Fetch user's conversations on mount
    useEffect(() => {
        if (isLoaded && user) {
            fetchConversations();
        }
    }, [isLoaded, user]);

    // Scroll to bottom when messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch conversations from API
    const fetchConversations = async () => {
        try {
            const response = await fetch("/api/conversations");
            if (!response.ok) throw new Error("Failed to fetch conversations");

            const data = await response.json();
            setConversations(data);

            // If there are conversations but none active, set the most recent one active
            if (data.length > 0 && !activeConversation) {
                setActiveConversation(data[0]);
                fetchMessages(data[0]._id);
            }
        } catch (error) {
            toast.error("Failed to load conversations");
            console.error(error);
        }
    };

    // Fetch messages for a conversation
    const fetchMessages = async (conversationId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/messages?conversationId=${conversationId}`);
            if (!response.ok) throw new Error("Failed to fetch messages");

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            toast.error("Failed to load messages");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a new conversation
    const createNewConversation = async () => {
        try {
            const response = await fetch("/api/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "New Conversation",
                    timestamp: new Date(),
                }),
            });

            if (!response.ok) throw new Error("Failed to create conversation");

            const newConversation = await response.json();
            setConversations([newConversation, ...conversations]);
            setActiveConversation(newConversation);
            setMessages([]);

            if (isMobile) {
                setShowSidebar(false);
            }

            toast.success("New conversation created");
        } catch (error) {
            toast.error("Failed to create conversation");
            console.error(error);
        }
    };

    // Delete a conversation
    const deleteConversation = async (id, e) => {
        e.stopPropagation();

        try {
            const response = await fetch(`/api/conversations?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete conversation");

            setConversations(conversations.filter(conv => conv._id !== id));

            if (activeConversation && activeConversation._id === id) {
                const remainingConversations = conversations.filter(conv => conv._id !== id);
                if (remainingConversations.length > 0) {
                    setActiveConversation(remainingConversations[0]);
                    fetchMessages(remainingConversations[0]._id);
                } else {
                    setActiveConversation(null);
                    setMessages([]);
                }
            }

            toast.success("Conversation deleted");
        } catch (error) {
            toast.error("Failed to delete conversation");
            console.error(error);
        }
    };

    // Select a conversation
    const selectConversation = (conversation) => {
        setActiveConversation(conversation);
        fetchMessages(conversation._id);

        if (isMobile) {
            setShowSidebar(false);
        }
    };

    // Send a message
    const sendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim() || isLoading) return;

        // Create conversation if none exists
        if (!activeConversation) {
            await createNewConversation();
        }

        const userMessage = {
            content: input.trim(),
            role: "user",
            timestamp: new Date(),
            _id: Date.now().toString(), // Temporary ID for new messages
        };

        // Optimistically update UI
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationId: activeConversation._id,
                }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();

            // Add AI response to messages
            setMessages(prev => [...prev, {
                content: data.response,
                role: "assistant",
                timestamp: new Date(),
                _id: Date.now().toString() + "-assistant", // Temporary ID for AI messages
            }]);

            // Update conversation list with new timestamp
            fetchConversations();
        } catch (error) {
            toast.error("Failed to get AI response");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Format the timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format the date for conversation list
    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    // Toggle theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
    };

    // Toggle search
    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            setSearchQuery("");
        }
    };

    // Export conversation
    const exportConversation = () => {
        if (!activeConversation || messages.length === 0) {
            toast.error("No conversation to export");
            return;
        }

        const exportData = {
            title: activeConversation.title,
            date: new Date().toLocaleDateString(),
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content,
                timestamp: formatTime(msg.timestamp)
            }))
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeConversation.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Conversation exported successfully");
    };

    // Add reaction to message
    const addReaction = (messageId, reaction) => {
        setMessageReactions(prev => {
            const current = prev[messageId] || { likes: 0, dislikes: 0 };
            return {
                ...prev,
                [messageId]: {
                    ...current,
                    [reaction]: current[reaction] + 1
                }
            };
        });
        toast.success(`Reaction added`);
    };

    // Copy message content
    const copyMessageContent = (messageId, content) => {
        navigator.clipboard.writeText(content).then(() => {
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
            toast.success("Message copied to clipboard");
        });
    };

    // Filter messages based on search query
    const filteredMessages = searchQuery
        ? messages.filter(msg =>
            msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
        : messages;

    // Generate message bubbles
    const renderMessage = (message, index) => {
        const isUser = message.role === "user";
        const messageId = message._id || index;
        const reactions = messageReactions[messageId] || { likes: 0, dislikes: 0 };

        // Process code blocks in messages
        const processedContent = detectAndHighlightCode(message.content);

        return (
            <div
                key={messageId}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div
                    className={`flex items-start max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    <div
                        className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center shadow-lg
                        ${isUser ? 'bg-gradient-to-br from-indigo-600 to-purple-700 ml-2' : 'bg-gradient-to-br from-gray-700 to-gray-900 mr-2'}`}
                    >
                        {isUser ? (
                            <div className="animate-pulse">{userEmoji}</div>
                        ) : (
                            <Bot size={18} className="text-blue-300" />
                        )}
                    </div>

                    <div
                        className={`px-4 py-3 rounded-2xl ${isUser
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-tr-none shadow-lg shadow-purple-900/20'
                            : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 rounded-tl-none border border-gray-700'
                            } relative group`}
                    >
                        {processedContent.isCode ? (
                            <div
                                className="whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: processedContent.content }}
                            />
                        ) : (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                        )}

                        <div className={`text-xs mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                        </div>

                        {/* Message Actions */}
                        <div className={`absolute ${isUser ? 'left-0 -translate-x-full -ml-2' : 'right-0 translate-x-full mr-2'} top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <button
                                onClick={() => addReaction(messageId, 'likes')}
                                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full shadow-md"
                            >
                                <ThumbsUp size={14} className="text-gray-300" />
                            </button>
                            <button
                                onClick={() => addReaction(messageId, 'dislikes')}
                                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full shadow-md"
                            >
                                <ThumbsDown size={14} className="text-gray-300" />
                            </button>
                            <button
                                onClick={() => copyMessageContent(messageId, message.content)}
                                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full shadow-md"
                            >
                                {copiedMessageId === messageId ? (
                                    <Check size={14} className="text-green-400" />
                                ) : (
                                    <Copy size={14} className="text-gray-300" />
                                )}
                            </button>
                        </div>

                        {/* Reaction Counters */}
                        {(reactions.likes > 0 || reactions.dislikes > 0) && (
                            <div className={`absolute ${isUser ? 'right-0 translate-x-full mr-2' : 'left-0 -translate-x-full -ml-2'} bottom-1 flex gap-2 text-xs`}>
                                {reactions.likes > 0 && (
                                    <span className="flex items-center bg-gray-800 px-1.5 py-0.5 rounded-md">
                                        <ThumbsUp size={10} className="text-blue-400 mr-1" />
                                        {reactions.likes}
                                    </span>
                                )}
                                {reactions.dislikes > 0 && (
                                    <span className="flex items-center bg-gray-800 px-1.5 py-0.5 rounded-md">
                                        <ThumbsDown size={10} className="text-red-400 mr-1" />
                                        {reactions.dislikes}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <>
            {/* <div className="w-full rounded-lg border border-gray-200 bg-black shadow-sm overflow-hidden">
                <div
                    className="flex items-center justify-between px-4 py-3 bg-blue-50 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center bg-bl">
                        <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-medium text-blue-800">Welcome to AlgoStub</h3>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                </div>

                {isExpanded && (
                    <div className="px-4 py-3">
                        <p className="text-gray-700 mb-3">
                            AlgoStub is your intelligent algorithmic problem-solving assistant. I can help you with:
                        </p>
                        <ul className="list-disc list-inside mb-3 text-gray-600 space-y-1">
                            <li>Understanding algorithm concepts</li>
                            <li>Solving coding challenges</li>
                            <li>Optimizing your solutions</li>
                            <li>Explaining time and space complexity</li>
                        </ul>
                        <p className="text-gray-700">
                            Get started by describing a problem or asking a question about algorithms or data structures!
                        </p>
                    </div>
                )}
            </div> */}
            <WelcomeHandler user={user} isDarkMode={isDarkMode} />
            <div className={`flex h-screen ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 to-black text-white'
                : 'bg-gradient-to-b from-gray-100 to-white text-gray-800'} overflow-hidden`}
            >
                <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    toastOptions={{
                        className: isDarkMode
                            ? "bg-gray-800 border border-purple-500/30 text-white"
                            : "bg-white border border-purple-500/30 text-gray-800"
                    }}
                />

                {/* Sidebar */}
                <div
                    className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-10 w-64 md:w-80 
                        ${isDarkMode
                            ? 'bg-gradient-to-b from-gray-900 to-black border-purple-900/30'
                            : 'bg-gradient-to-b from-gray-100 to-white border-purple-200/50'
                        } h-full overflow-hidden flex flex-col border-r backdrop-blur-sm`}
                >
                    {/* Sidebar Header */}
                    <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-purple-900/30' : 'border-purple-200/50'}`}>
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2 rounded-lg">
                                <Code size={20} />
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                AlgoStub Chat
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg hover:opacity-90 transition-opacity ${isDarkMode
                                    ? 'bg-gray-800 hover:bg-gray-700'
                                    : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                            </button>

                            <button
                                onClick={createNewConversation}
                                className="p-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className={`px-3 py-2 border-b ${isDarkMode ? 'border-purple-900/30' : 'border-purple-200/50'}`}>
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                            <Search size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className={`bg-transparent w-full focus:outline-none text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {conversations.length > 0 ? (
                            conversations
                                .filter(conv => searchQuery ? conv.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                                .map(conversation => (
                                    <div
                                        key={conversation._id}
                                        onClick={() => selectConversation(conversation)}
                                        className={`flex items-center justify-between px-3 py-3 rounded-xl mb-1.5 cursor-pointer transition-all duration-150 border 
                                    ${activeConversation && activeConversation._id === conversation._id
                                                ? isDarkMode
                                                    ? 'border-purple-600/50 bg-gradient-to-r from-purple-900/20 to-indigo-900/10 shadow-md'
                                                    : 'border-purple-300/70 bg-gradient-to-r from-purple-100/60 to-indigo-100/40 shadow-md'
                                                : isDarkMode
                                                    ? 'border-transparent hover:bg-gray-800/50'
                                                    : 'border-transparent hover:bg-gray-200/70'
                                            }`}
                                    >
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="truncate font-medium">{conversation.title}</span>
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {formatDate(conversation.updatedAt)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => deleteConversation(conversation._id, e)}
                                            className={`p-1 rounded-lg transition-colors ${isDarkMode
                                                ? 'hover:bg-gray-700'
                                                : 'hover:bg-gray-300'}`}
                                        >
                                            <Trash2 size={16} className={`${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`} />
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <div className={`flex flex-col items-center justify-center text-center py-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <Sparkles size={40} className="text-purple-500 mb-4" />
                                <p className={`font-medium text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No conversations yet</p>
                                <p className="text-sm mt-2 max-w-xs">Start a new chat to begin coding discussions</p>
                                <button
                                    onClick={createNewConversation}
                                    className="mt-6 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg hover:opacity-90 transition-opacity shadow-lg text-white"
                                >
                                    Start New Chat
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className={`p-4 border-t ${isDarkMode ? 'border-purple-900/30' : 'border-purple-200/50'} flex items-center justify-between`}>
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/20">
                                    <span className="text-lg">{userEmoji}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium truncate">
                                        {user.fullName || user.username}
                                    </span>
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium Member</span>
                                </div>
                            </div>
                            <button className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                                <Settings size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Chat Header */}
                    <div
                        className={`${isDarkMode
                            ? 'bg-gray-900/60 backdrop-blur-sm border-purple-900/30'
                            : 'bg-white/60 backdrop-blur-sm border-purple-200/30'
                            } p-4 border-b flex items-center justify-between`}
                    >
                        <div className="flex items-center">
                            {isMobile && (
                                <button
                                    onClick={() => setShowSidebar(!showSidebar)}
                                    className={`p-1.5 mr-3 rounded-lg transition-colors ${isDarkMode
                                        ? 'bg-gray-800 hover:bg-gray-700'
                                        : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {showSidebar ? <ArrowLeft size={18} /> : <PanelLeft size={18} />}
                                </button>
                            )}
                            <h2 className="font-medium text-lg">
                                {activeConversation ? activeConversation.title : "New Chat"}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-2">
                            {activeConversation && (
                                <>
                                    <button
                                        onClick={exportConversation}
                                        className={`p-1.5 rounded-lg transition-colors ${isDarkMode
                                            ? 'bg-gray-800 hover:bg-gray-700'
                                            : 'bg-gray-200 hover:bg-gray-300'}`}
                                        title="Export conversation"
                                    >
                                        <Download size={16} />
                                    </button>
                                    <button
                                        onClick={toggleSearch}
                                        className={`p-1.5 rounded-lg transition-colors ${isDarkMode
                                            ? 'bg-gray-800 hover:bg-gray-700'
                                            : 'bg-gray-200 hover:bg-gray-300'} ${isSearching ? 'bg-purple-600/20' : ''}`}
                                        title="Search in conversation"
                                    >
                                        <Search size={16} />
                                    </button>
                                </>
                            )}
                            <span className={`text-xs ${isDarkMode
                                ? 'bg-purple-600/20 text-purple-300 border-purple-600/30'
                                : 'bg-purple-100 text-purple-600 border-purple-300/50'
                                } px-2 py-1 rounded-full border`}>
                                AlgoStub AI
                            </span>
                        </div>
                    </div>

                    {/* Search in chat */}
                    {isSearching && activeConversation && (
                        <div className={`p-2 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search in conversation..."
                                    className={`flex-1 ${isDarkMode
                                        ? 'bg-gray-800 text-white border-gray-700 focus:ring-purple-500'
                                        : 'bg-white text-gray-800 border-gray-300 focus:ring-purple-400'
                                        } px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 border text-sm`}
                                    autoFocus
                                />
                                {searchQuery && (
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {filteredMessages.length} results
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setIsSearching(false);
                                    }}
                                    className={`${isDarkMode
                                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                        : 'bg-white hover:bg-gray-200 text-gray-500'
                                        } p-1.5 rounded-lg`}
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Messages Area */}
                    <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        {filteredMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center py-16">
                                <Bot size={48} className={`${isDarkMode ? 'text-purple-400' : 'text-purple-500'} mb-4`} />
                                <h3 className="text-xl font-medium mb-2">Welcome to AlgoStub Chat</h3>
                                <p className={`max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Ask me anything about coding, algorithms, or technical concepts.
                                    I'm here to help solve problems and explain solutions.
                                </p>
                            </div>
                        ) : (
                            <>
                                {filteredMessages.map((message, index) => renderMessage(message, index))}
                                <div ref={endOfMessagesRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={sendMessage}
                        className={`${isDarkMode
                            ? 'bg-gray-900/60 backdrop-blur-sm border-t border-purple-900/30'
                            : 'bg-white/60 backdrop-blur-sm border-t border-purple-200/30'
                            } p-4`}
                    >
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask a coding question..."
                                    className={`w-full resize-none py-3 px-4 pr-12 rounded-xl ${isDarkMode
                                        ? 'bg-gray-800 text-white border-purple-900/30 focus:border-purple-500'
                                        : 'bg-gray-100 text-gray-800 border-purple-200/50 focus:border-purple-400'
                                        } border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all`}
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage(e);
                                        }
                                    }}
                                    style={{
                                        minHeight: '54px',
                                        maxHeight: '150px',
                                        height: 'auto'
                                    }}
                                />
                                <button
                                    type="submit"
                                    className={`absolute right-3 bottom-[calc(50%-14px)] p-2 rounded-lg transition-colors
                        ${input.trim()
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-900/20'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!input.trim() || isLoading}
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <span className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Powered by AlgoStub AI · Press Enter to send · Shift+Enter for new line
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <FooterSection />
        </>
    );
}