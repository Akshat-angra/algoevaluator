// 'use client';
// import { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { MessageSquare, Star, X, Send, Sparkles } from "lucide-react";
// import { cn } from '@/lib/utils';

// export function FeedbackDialog() {
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

//         setStatus({ message: 'Submitting...', type: 'info' });

//         try {
//             const res = await fetch('/api/feedback', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, message, rating })
//             });

//             const data = await res.json();

//             if (data.success) {
//                 setStatus({ message: 'Thank you for your valuable feedback! 🎉', type: 'success' });
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
//             <DialogContent className="sm:max-w-[500px] md:max-w-[600px] bg-[#0A0118] border border-indigo-500/20 shadow-[0_0_50px_0_rgba(124,58,237,0.1)] backdrop-blur-xl rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]" />
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

//                 <DialogHeader className="relative border-b border-indigo-500/20 pb-4">
//                     <DialogTitle className="flex items-center gap-3">
//                         <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
//                             <Sparkles className="w-5 h-5 text-white animate-pulse" />
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
//                                 Your Opinion Matters!
//                             </span>
//                             <span className="text-sm text-indigo-300/70">Help us improve your experience</span>
//                         </div>
//                     </DialogTitle>
//                 </DialogHeader>

//                 <div className="relative grid gap-6 py-6">
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="name" className="text-indigo-200 font-medium flex items-center gap-2">
//                                 Name
//                                 <span className="text-pink-500">*</span>
//                             </Label>
//                             <Input
//                                 id="name"
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="email" className="text-indigo-200 font-medium flex items-center gap-2">
//                                 Email
//                                 <span className="text-indigo-300/70 text-sm">(Optional)</span>
//                             </Label>
//                             <Input
//                                 id="email"
//                                 type="email"
//                                 placeholder="your@email.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="message" className="text-indigo-200 font-medium flex items-center gap-2">
//                             Your Feedback
//                             <span className="text-pink-500">*</span>
//                         </Label>
//                         <Textarea
//                             id="message"
//                             placeholder="Share your thoughts with us..."
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="min-h-[120px] bg-indigo-950/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-300/30 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200 resize-none"
//                         />
//                     </div>

//                     <div className="space-y-3">
//                         <Label className="text-indigo-200 font-medium">How would you rate your experience?</Label>
//                         <div className="flex gap-2">
//                             {[1, 2, 3, 4, 5].map((value) => (
//                                 <Button
//                                     key={value}
//                                     type="button"
//                                     variant="outline"
//                                     className={cn(
//                                         "flex-1 bg-indigo-950/30 border-indigo-500/30 hover:bg-indigo-900/40 transition-all duration-300",
//                                         rating === value && "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20"
//                                     )}
//                                     onClick={() => setRating(value)}
//                                 >
//                                     <Star className={cn(
//                                         "w-5 h-5 transition-transform duration-200 hover:scale-110",
//                                         rating >= value ? "fill-current text-amber-400" : "fill-none text-indigo-300"
//                                     )} />
//                                 </Button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {status.message && (
//                     <div className={cn(
//                         "relative mb-4 p-4 rounded-lg text-sm font-medium border backdrop-blur-sm",
//                         status.type === 'success' && "bg-green-500/10 text-green-300 border-green-500/20",
//                         status.type === 'error' && "bg-red-500/10 text-red-300 border-red-500/20",
//                         status.type === 'info' && "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
//                     )}>
//                         <div className="flex items-center justify-center gap-2">
//                             {status.type === 'success' && <Sparkles className="w-4 h-4" />}
//                             {status.message}
//                         </div>
//                     </div>
//                 )}

//                 <div className="relative flex justify-end gap-3 border-t border-indigo-500/20 pt-4">
//                     <Button
//                         variant="outline"
//                         onClick={() => setOpen(false)}
//                         className="bg-indigo-950/30 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 hover:text-white transition-all duration-200"
//                     >
//                         <X className="w-4 h-4 mr-2" />
//                         Close
//                     </Button>
//                     <Button
//                         onClick={handleSubmit}
//                         className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transition-all duration-300"
//                     >
//                         <Send className="w-4 h-4 mr-2" />
//                         Submit Feedback
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default FeedbackDialog;

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Star, X, Send, Sparkles, Brain, Cpu } from "lucide-react";
import { cn } from '@/lib/utils';

export function FeedbackForm() {
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

    const handleSubmit = async () => {
        if (!name.trim() || !message.trim()) {
            setStatus({ message: 'Name and feedback message are required.', type: 'error' });
            return;
        }

        setStatus({ message: 'Processing your feedback...', type: 'info' });

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, rating })
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ message: 'Feedback processed successfully! Thank you for helping us improve. 🎯', type: 'success' });
                setName('');
                setEmail('');
                setMessage('');
                setRating(5);
                setTimeout(() => setOpen(false), 2000);
            } else {
                setStatus({ message: 'Failed to process feedback.', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Error processing feedback.', type: 'error' });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] md:max-w-[600px] bg-[#0A0118] border border-[#6366F1]/20 shadow-[0_0_100px_0_rgba(99,102,241,0.15)] backdrop-blur-2xl rounded-2xl overflow-hidden p-0">
                {/* Animated gradient backgrounds */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)] animate-pulse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_50%)] animate-pulse delay-700" />

                {/* Neural network pattern overlay */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative p-6">
                    <DialogHeader className="relative border-b border-[#6366F1]/20 pb-6">
                        <div className="flex items-center gap-4">
                            {/* Logo animation container */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-2xl blur-xl opacity-50 animate-pulse" />
                                <div className="relative p-3 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
                                        AlgoFeedback
                                    </span>
                                    <div className="px-2 py-0.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20">
                                        <span className="text-xs font-medium text-[#6366F1]">AI-Powered</span>
                                    </div>
                                </div>
                                <span className="text-sm text-[#6366F1]/70">Enhancing experiences through intelligent feedback</span>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="relative grid gap-6 py-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#6366F1] font-medium flex items-center gap-2">
                                    Name
                                    <span className="text-[#EC4899]">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-[#6366F1]/5 border-[#6366F1]/20 text-white placeholder:text-[#6366F1]/40 focus:border-[#A855F7] focus:ring-[#A855F7]/20 transition-all duration-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#6366F1] font-medium flex items-center gap-2">
                                    Email
                                    <span className="text-[#6366F1]/70 text-sm">(Optional)</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-[#6366F1]/5 border-[#6366F1]/20 text-white placeholder:text-[#6366F1]/40 focus:border-[#A855F7] focus:ring-[#A855F7]/20 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-[#6366F1] font-medium flex items-center gap-2">
                                Your Feedback
                                <span className="text-[#EC4899]">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Share your thoughts with us..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[120px] bg-[#6366F1]/5 border-[#6366F1]/20 text-white placeholder:text-[#6366F1]/40 focus:border-[#A855F7] focus:ring-[#A855F7]/20 transition-all duration-200 resize-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[#6366F1] font-medium">Rate your experience</Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Button
                                        key={value}
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                            "flex-1 bg-[#6366F1]/5 border-[#6366F1]/20 hover:bg-[#6366F1]/10 transition-all duration-300",
                                            rating === value && "bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white border-transparent hover:from-[#6366F1] hover:to-[#A855F7] shadow-lg shadow-[#6366F1]/20"
                                        )}
                                        onClick={() => setRating(value)}
                                    >
                                        <Star className={cn(
                                            "w-5 h-5 transition-transform duration-200 hover:scale-110",
                                            rating >= value ? "fill-current text-[#F59E0B]" : "fill-none text-[#6366F1]/70"
                                        )} />
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {status.message && (
                            <div className={cn(
                                "relative p-4 rounded-xl text-sm font-medium border backdrop-blur-sm",
                                status.type === 'success' && "bg-green-500/10 text-green-300 border-green-500/20",
                                status.type === 'error' && "bg-red-500/10 text-red-300 border-red-500/20",
                                status.type === 'info' && "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20"
                            )}>
                                <div className="flex items-center justify-center gap-2">
                                    {status.type === 'success' && <Sparkles className="w-4 h-4" />}
                                    {status.type === 'info' && <Cpu className="w-4 h-4 animate-pulse" />}
                                    {status.message}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative flex justify-end gap-3 border-t border-[#6366F1]/20 pt-6">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-[#6366F1]/5 border-[#6366F1]/20 text-[#6366F1] hover:bg-[#6366F1]/10 hover:text-white transition-all duration-200"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white hover:from-[#4F46E5] hover:to-[#9333EA] shadow-lg shadow-[#6366F1]/20 transition-all duration-300"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FeedbackForm;