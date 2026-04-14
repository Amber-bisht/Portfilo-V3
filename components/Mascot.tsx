import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Loader2, User, Bot, Linkedin, Twitter, Mail, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Mascot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [musicStatus, setMusicStatus] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);
        const handleStatusUpdate = (e: any) => {
            setMusicStatus(e.detail);
        };
        window.addEventListener('music-status-update', handleStatusUpdate);
        return () => window.removeEventListener('music-status-update', handleStatusUpdate);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    musicContext: musicStatus // Inject current music state
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();
            // Strip any <think> reasoning blocks if they slip through
            const cleanContent = data.content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
            setMessages(prev => [...prev, { role: 'assistant', content: cleanContent }]);

            // Scan for music commands in the assistant's response
            const lowerContent = cleanContent.toLowerCase();
            let action = '';

            if (lowerContent.includes('playing') || lowerContent.includes('play music') || lowerContent.includes('play some music')) {
                action = 'play';
            } else if (lowerContent.includes('pausing') || lowerContent.includes('pause music') || lowerContent.includes('stopping')) {
                action = 'pause';
            } else if (lowerContent.includes('next song') || lowerContent.includes('next track') || lowerContent.includes('skip')) {
                action = 'next';
            } else if (lowerContent.includes('previous song') || lowerContent.includes('previous track') || lowerContent.includes('back')) {
                action = 'prev';
            }

            if (action) {
                window.dispatchEvent(new CustomEvent('music-command', { detail: { action } }));
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="hidden lg:block fixed bottom-0 right-0 z-50 pointer-events-none">

            {/* Chat Interface */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="absolute bottom-4 right-4 md:right-8 w-[350px] md:w-[400px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col z-[100]"
                    >
                        {/* Background Watermark with Frame */}
                        <div className="absolute inset-2 border border-white/10 rounded-2xl opacity-20 pointer-events-none overflow-hidden">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/reze's.webp"
                                    alt="Background Watermark"
                                    fill
                                    sizes="400px"
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Chat Header */}
                        <div className="p-4 bg-black border-b border-black flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-red-500/30 flex-shrink-0">
                                    <Image
                                        src="/reze-logo.webp"
                                        alt="Reze AI Logo"
                                        width={32}
                                        height={32}
                                        sizes="32px"
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-white text-sm font-bold tracking-tight truncate">Reze AI</h3>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <div className="flex items-center gap-1 pr-2 border-r border-white/10 mr-1">
                                    <a href="https://www.linkedin.com/in/amber-bisht-05a096294" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href="https://x.com/amber_bisht" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href="mailto:bishtamber0@gmail.com" className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 opacity-50">
                                    <p className="text-xs text-gray-400">
                                        Hello. I am Reze, Amber&apos;s assistant. <br />
                                        How can I help you connect with him today?
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-red-600 text-white rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                        }`}>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>,
                                                a: ({ href, children }) => (
                                                    <a href={href} className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                                                        {children}
                                                    </a>
                                                ),
                                                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                                        <span className="text-xs text-gray-400">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/50 border-t border-black">
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1 focus-within:border-red-600/50 transition-colors"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-200 px-3 py-2 placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="p-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:bg-gray-800 rounded-xl transition-all shadow-lg"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isChatOpen && (
                <div className="relative w-48 h-48 md:w-[280px] md:h-[280px] drop-shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-auto group translate-x-[10%] md:translate-x-[15%]">
                    {/* Tooltip */}
                    <div className="absolute bottom-[10%] left-[-100px] md:left-[-180px] bg-black/80 backdrop-blur-sm text-white text-xs md:text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[150px] md:max-w-[200px] shadow-lg border border-gray-800 text-left z-[60]">
                        This is Makima, Amber&apos;s Assistant. <br /> Tap to chat with me!
                    </div>

                    <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setIsChatOpen(true)}
                    >
                        <Image
                            src="/reze's.webp"
                            alt="Reze Assistant"
                            fill
                            sizes="(max-width: 768px) 128px, 180px"
                            className="object-contain object-bottom transition-opacity duration-150 ease-in-out"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mascot;
