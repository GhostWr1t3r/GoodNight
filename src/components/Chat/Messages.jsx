import React, { useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Download, MessageCircle, UserX, Smile, Zap } from 'lucide-react';
import { useChat } from '../../contextApi/ChatContext';
import { socket } from '../../Socket';

const Messages = () => {
    const {  
        userId, 
        isSearching, 
        setIsSearching, 
        receiver, 
        messages, 
        setMessages, 
        isTyping 
    } = useChat();

    // Add message deduplication logic
    useEffect(() => {
        const uniqueMessages = messages.reduce((acc, curr) => {
            const lastMessage = acc[acc.length - 1];
            if (lastMessage && 
                ((curr.you && lastMessage.you === curr.you) || 
                 (curr.stranger && lastMessage.stranger === curr.stranger))) {
                return acc;
            }
            return [...acc, curr];
        }, []);

        if (uniqueMessages.length !== messages.length) {
            setMessages(uniqueMessages);
        }
    }, [messages, setMessages]);

    const newChat = () => {
        setIsSearching(true);
        setMessages([]);
        socket.emit("pairing-user", userId, (error) => {
            if (error) {
                console.error(error);
                return;
            }
        });
    };

    const takeScreenshot = async () => {
        try {
            const html2canvasModule = await import('html2canvas');
            const html2canvas = html2canvasModule.default;
            
            const element = document.getElementById('chat-log');
            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2
            });
            
            const screenshot = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = screenshot;
            downloadLink.download = `chat_log_${new Date().toISOString().slice(0,10)}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (err) {
            console.error("Screenshot failed:", err);
            alert('Failed to take screenshot. Please try again.');
        }
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black font-sans">
            <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 flex-grow flex flex-col justify-center">
                <div className="h-[80vh] sm:h-[80vh] md:h-[80vh] flex flex-col justify-center relative">
                    <div 
                        id="chat-log" 
                        className="h-full w-full bg-zinc-900/40 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                                 border border-white/10 flex flex-col overflow-hidden shadow-xl"
                        style={{ marginTop: '50px' }}
                    >
                        {/* Welcome Screen */}
                        {!isSearching && !receiver && messages.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="relative">
                                        <MessageCircle size={40} className="text-pink-500/70 mx-auto sm:h-14 sm:w-14" />
                                        <Sparkles size={20} className="absolute -top-2 -right-2 text-purple-400 animate-pulse sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-300 
                                                     text-transparent bg-clip-text mb-2 sm:mb-4 tracking-tight">
                                            Chat Without Borders ✨
                                        </h2>
                                        <p className="text-zinc-400 text-base sm:text-lg font-medium">
                                            Connect instantly with fascinating people worldwide 🌎
                                        </p>
                                    </div>
                                    <button
                                        onClick={newChat}
                                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500/10 
                                                 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 
                                                 border border-white/10 rounded-xl text-white/90 font-bold 
                                                 transition-all hover:border-white/20 active:scale-98 text-base sm:text-lg"
                                    >
                                        <Zap size={18} className="mr-2 text-pink-400 sm:h-5 sm:w-5" /> Start Your Journey
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Main Chat Container */}
                        <div className="flex-1 flex flex-col h-full">
                            {/* Status header for desktop */}
                            {receiver && window.innerWidth > 640 && (
                                <div className="p-3 sm:p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 
                                              border-b border-white/10">
                                    <p className="text-white/90 text-center text-sm sm:text-base font-medium flex items-center justify-center">
                                        <Smile className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-400" />
                                        Connected with a new homie from somewhere amazing! ✨
                                    </p>
                                </div>
                            )}

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                <div className="flex flex-col justify-end min-h-full">
                                    {/* Searching status */}
                                    {isSearching && (
                                        <div className="flex items-center justify-center gap-2 p-3 sm:p-4 text-pink-400 text-sm sm:text-base font-medium">
                                            <RefreshCw size={16} className="animate-spin sm:h-5 sm:w-5" />
                                            <span>Finding your next amazing conversation... 🔍</span>
                                        </div>
                                    )}

                                    {/* Messages */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {messages.map((message, index) => (
                                            <div 
                                                key={index}
                                                className={`max-w-[85%] sm:max-w-[75%] ${message?.stranger ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}
                                            >
                                                <div className={`rounded-xl p-3 sm:p-4 ${
                                                    message?.stranger 
                                                        ? 'bg-white/5 border border-white/10' 
                                                        : 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-white/10'
                                                }`}>
                                                    <div className={`text-xs sm:text-sm mb-1 font-bold ${
                                                        message?.stranger ? 'text-purple-400' : 'text-pink-400'
                                                    }`}>
                                                        {message?.stranger ? "✨ Mystery homie" : "You 💫"}
                                                    </div>
                                                    <div className="text-white/90 text-sm sm:text-base font-medium break-words">
                                                        {message?.stranger ? message.stranger : message.you}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Typing indicator */}
                                    {isTyping && (
                                        <div className="text-zinc-400 text-xs sm:text-sm font-medium italic px-3 sm:px-4 flex items-center mt-3">
                                            <span className="animate-pulse mr-2">✍️</span>
                                            Your homie is typing...
                                        </div>
                                    )}

                                    {/* Scroll anchor */}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Status footer for mobile */}
                            {receiver && window.innerWidth <= 640 && (
                                <div className="sticky bottom-0 p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 
                                              border-t border-white/10 backdrop-blur-md">
                                    <p className="text-white/90 text-center text-sm font-medium flex items-center justify-center">
                                        <Smile className="w-4 h-4 mr-2 text-pink-400" />
                                        Connected with a new homie from somewhere amazing! ✨
                                    </p>
                                </div>
                            )}

                            {/* Chat Ended State */}
                            {!isSearching && !receiver && messages.length > 0 && (
                                <div className="sticky bottom-0 flex flex-col items-center gap-3 p-4 
                                              text-center bg-zinc-900/80 backdrop-blur-md border-t border-white/10">
                                    <div className="relative">
                                        <UserX size={32} className="text-pink-400" />
                                        <span className="absolute -bottom-1 -right-1 text-base">👋</span>
                                    </div>
                                    <p className="text-white/80 text-base font-medium">Until next time!</p>
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={newChat}
                                            className="w-full sm:w-auto flex items-center justify-center px-4 py-3 
                                                     bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 
                                                     hover:to-purple-500/20 border border-white/10 rounded-xl
                                                     text-white font-bold transition-all hover:border-white/20 
                                                     active:scale-98 text-sm"
                                        >
                                            <Zap size={14} className="mr-2 text-pink-400" /> 
                                            Start New Chat
                                        </button>
                                        <button
                                            onClick={takeScreenshot}
                                            className="w-full sm:w-auto flex items-center justify-center px-4 py-3 
                                                     bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 
                                                     hover:to-pink-500/20 border border-white/10 rounded-xl
                                                     text-white font-bold transition-all hover:border-white/20 
                                                     active:scale-98 text-sm"
                                        >
                                            <Download size={14} className="mr-2 text-purple-400" />
                                            Save Memories
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
