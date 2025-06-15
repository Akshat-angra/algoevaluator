'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Star, X, Send, Sparkles } from "lucide-react";
import { cn } from '@/lib/utils';

export function FeedbackDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState({
        message: '',
        type: ''
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setOpen(true);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const hasShown = localStorage.getItem("feedback_shown");

        if (!hasShown) {
            const timeout = setTimeout(() => {
                setOpen(true);
                localStorage.setItem("feedback_shown", "true");
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, []);

    const handleSubmit = async () => {
        if (!name.trim() || !message.trim()) {
            setStatus({ message: 'Name and feedback message are required.', type: 'error' });
            return;
        }

        setStatus({ message: 'Submitting...', type: 'info' });

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, rating })
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ message: 'Thank you for your valuable feedback! 🎉', type: 'success' });
                setName('');
                setEmail('');
                setMessage('');
                setRating(5);
                setTimeout(() => setOpen(false), 2000);
            } else {
                setStatus({ message: 'Failed to submit feedback.', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Error submitting feedback.', type: 'error' });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] md:max-w-[600px] bg-[#0A0118] border border-indigo-500/20 shadow-[0_0_50px_0_rgba(124,58,237,0.1)] backdrop-blur-xl rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

                <DialogHeader className="relative border-b border-indigo-500/20 pb-4">
                    <DialogTitle className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Your Opinion Matters!
                            </span>
                            <span className="text-sm text-indigo-300/70">Help us improve your experience</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="relative grid gap-6 py-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-indigo-200 font-medium flex items-center gap-2">
                                Name
                                <span className="text-pink-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-indigo-200 font-medium flex items-center gap-2">
                                Email
                                <span className="text-indigo-300/70 text-sm">(Optional)</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-indigo-200 font-medium flex items-center gap-2">
                            Your Feedback
                            <span className="text-pink-500">*</span>
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Share your thoughts with us..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[120px] bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-indigo-200 font-medium">How would you rate your experience?</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Button
                                    key={value}
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        "flex-1 bg-indigo-950/30 border-indigo-500/30 hover:bg-indigo-900/40 transition-all duration-300",
                                        rating === value && "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20"
                                    )}
                                    onClick={() => setRating(value)}
                                >
                                    <Star className={cn(
                                        "w-5 h-5 transition-transform duration-200 hover:scale-110",
                                        rating >= value ? "fill-current text-amber-400" : "fill-none text-indigo-300"
                                    )} />
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {status.message && (
                    <div className={cn(
                        "relative mb-4 p-4 rounded-lg text-sm font-medium border backdrop-blur-sm",
                        status.type === 'success' && "bg-green-500/10 text-green-300 border-green-500/20",
                        status.type === 'error' && "bg-red-500/10 text-red-300 border-red-500/20",
                        status.type === 'info' && "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                    )}>
                        <div className="flex items-center justify-center gap-2">
                            {status.type === 'success' && <Sparkles className="w-4 h-4" />}
                            {status.message}
                        </div>
                    </div>
                )}

                <div className="relative flex justify-end gap-3 border-t border-indigo-500/20 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="bg-indigo-950/30 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 hover:text-white transition-all duration-200"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transition-all duration-300"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Feedback
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FeedbackDialog;

// 'use client';

// import { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { MessageSquare, Star, X, Send, Sparkles, Brain } from "lucide-react";
// import { cn } from '@/lib/utils';

// // This component can be used if you want to visually hide elements but keep them accessible
// const VisuallyHidden = ({ children }) => (
//     <span className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
//         {children}
//     </span>
// );

// export function FeedbackForm() {
//     const [open, setOpen] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [rating, setRating] = useState(5);
//     const [status, setStatus] = useState({
//         message: '',
//         type: ''
//     });

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setOpen(true);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     const handleSubmit = async () => {
//         if (!name.trim() || !message.trim()) {
//             setStatus({ message: 'Name and feedback message are required.', type: 'error' });
//             return;
//         }

//         setStatus({ message: 'Processing your feedback...', type: 'info' });

//         try {
//             const res = await fetch('/api/feedback', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, message, rating })
//             });

//             const data = await res.json();

//             if (data.success) {
//                 setStatus({ message: 'Thank you for your feedback!', type: 'success' });
//                 setName('');
//                 setEmail('');
//                 setMessage('');
//                 setRating(5);
//                 setTimeout(() => setOpen(false), 2000);
//             } else {
//                 setStatus({ message: 'Failed to submit feedback.', type: 'error' });
//             }
//         } catch (error) {
//             setStatus({ message: 'Error submitting feedback.', type: 'error' });
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="max-w-md bg-black border border-zinc-800 rounded-xl shadow-xl shadow-purple-500/10 p-0 overflow-hidden">
//                 {/* Properly add DialogTitle for accessibility */}
//                 <DialogTitle className="sr-only">Feedback Form</DialogTitle>

//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
//                     <div className="flex items-center gap-3">
//                         <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
//                             <MessageSquare className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                             <h2 className="text-xl font-bold text-white">Share Your Thoughts</h2>
//                             <p className="text-white/80 text-sm">We value your feedback</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Subtle gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-indigo-500/5 pointer-events-none" />

//                 {/* Form */}
//                 <div className="p-6 space-y-5 relative z-10">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
//                                 Name <span className="text-purple-400">*</span>
//                             </Label>
//                             <Input
//                                 id="name"
//                                 placeholder="Your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:ring-purple-500 focus:border-purple-500"
//                                 aria-required="true"
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
//                                 Email <span className="text-zinc-500 text-xs">(Optional)</span>
//                             </Label>
//                             <Input
//                                 id="email"
//                                 type="email"
//                                 placeholder="your@email.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:ring-purple-500 focus:border-purple-500"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="message" className="text-sm font-medium text-zinc-300">
//                             Your Feedback <span className="text-purple-400">*</span>
//                         </Label>
//                         <Textarea
//                             id="message"
//                             placeholder="Tell us what you think..."
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="min-h-24 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:ring-purple-500 focus:border-purple-500 resize-none"
//                             aria-required="true"
//                         />
//                     </div>

//                     <div className="space-y-3">
//                         <Label className="text-sm font-medium text-zinc-300">
//                             Rate your experience
//                         </Label>
//                         <div className="flex gap-2" role="radiogroup" aria-label="Rating">
//                             {[1, 2, 3, 4, 5].map((value) => (
//                                 <Button
//                                     key={value}
//                                     type="button"
//                                     variant="outline"
//                                     className={cn(
//                                         "flex-1 bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-200",
//                                         rating === value && "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent hover:from-purple-700 hover:to-indigo-700"
//                                     )}
//                                     onClick={() => setRating(value)}
//                                     aria-checked={rating === value}
//                                     role="radio"
//                                     aria-label={`${value} star${value !== 1 ? 's' : ''}`}
//                                 >
//                                     <Star className={cn(
//                                         "w-5 h-5 transition-all duration-200",
//                                         rating >= value ? "fill-current text-amber-400" : "fill-none text-zinc-500"
//                                     )} />
//                                 </Button>
//                             ))}
//                         </div>
//                     </div>

//                     {status.message && (
//                         <div className={cn(
//                             "p-3 rounded-lg text-sm border",
//                             status.type === 'success' && "bg-green-900/20 text-green-400 border-green-800/30",
//                             status.type === 'error' && "bg-red-900/20 text-red-400 border-red-800/30",
//                             status.type === 'info' && "bg-purple-900/20 text-purple-400 border-purple-800/30"
//                         )}
//                             role="alert"
//                             aria-live="polite"
//                         >
//                             <div className="flex items-center gap-2">
//                                 {status.type === 'success' && <Sparkles className="w-4 h-4" />}
//                                 {status.type === 'info' && <Brain className="w-4 h-4 animate-pulse" />}
//                                 {status.message}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div className="border-t border-zinc-800 p-4 bg-zinc-900/50 flex justify-end gap-3">
//                     <Button
//                         variant="outline"
//                         onClick={() => setOpen(false)}
//                         className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200"
//                     >
//                         <X className="w-4 h-4 mr-2" />
//                         Close
//                     </Button>
//                     <Button
//                         onClick={handleSubmit}
//                         className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
//                     >
//                         <Send className="w-4 h-4 mr-2" />
//                         Submit
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default FeedbackForm;