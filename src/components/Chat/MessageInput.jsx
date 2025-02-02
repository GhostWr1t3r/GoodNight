import React, { useEffect, useRef } from 'react';
import { useChat } from '../../contextApi/ChatContext';
import { socket } from '../../Socket';
import { useNavigate } from 'react-router-dom';
import { Send, X, Plus, Loader2 } from 'lucide-react';

const MessageInput = () => {
    const { 
        userId, 
        onlineUsers, 
        isSearching, 
        setIsSearching, 
        receiver, 
        setReceiver, 
        setMessages, 
        isSending, 
        setIsSending, 
        message, 
        setMessage, 
        setIsTyping 
    } = useChat();

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const formRef = useRef(null);

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

    const sendMessage = async (e) => {
        e?.preventDefault();
        e?.stopPropagation(); // Prevent any bubbling that might cause blur
        
        if (isSending || message.trim() === "" || isSearching || !receiver) return;
        
        const currentMessage = message.trim();
        setIsSending(true);
        setMessage("");  // Clear input immediately

        // Keep focus on input
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);

        socket.emit("send-message", receiver, currentMessage, (success) => {
            if (success) {
                setMessages(prev => [...prev, { you: currentMessage }]);
                // Ensure input stays focused after message is sent
                inputRef.current?.focus();
            }
            setIsSending(false);
            // Focus one more time after state updates
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        });
    };

    const disconnectChat = () => {
        if (receiver) {
            socket.emit("chat-close", receiver, () => {
                setReceiver("");
                setIsTyping(false);
                setMessage("");
            });
        } else {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false);
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const typingHandle = (e) => {
        if (!receiver) return;
        
        if (e.target.value !== "") {
            socket.emit("typing", receiver);
        } else {
            socket.emit("typing stop", receiver);
        }
    };

    // Auto-focus input when receiver changes
    useEffect(() => {
        if (receiver) {
            inputRef.current?.focus();
        }
    }, [receiver]);

    useEffect(() => {
        if (userId && onlineUsers.find((user) => user.userId === userId)) {
            newChat();
        } else {
            navigate("/");
        }
    }, []);

    // Prevent default form submission behavior that might blur input
    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const preventBlur = (e) => {
                e.preventDefault();
                inputRef.current?.focus();
            };
            form.addEventListener('submit', preventBlur);
            return () => form.removeEventListener('submit', preventBlur);
        }
    }, []);

    return (
        <form 
            ref={formRef}
            onSubmit={sendMessage}
            className="sticky bottom-0 left-0 right-0 w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-t border-white/10"
            style={{ 
                minHeight: '64px',
                paddingBottom: 'env(safe-area-inset-bottom)'
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
                {!receiver && !isSearching ? (
                    <button 
                        type="button"
                        onClick={newChat}
                        className="flex-shrink-0 h-10 sm:h-11 px-3 sm:px-4 rounded-xl font-medium transition-all 
                                 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base
                                 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 
                                 hover:to-teal-500/30 text-emerald-400 border border-emerald-500/20"
                    >
                        <Plus size={16} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">New Chat</span>
                    </button>
                ) : (
                    <button 
                        type="button"
                        onClick={disconnectChat}
                        className="flex-shrink-0 h-10 sm:h-11 px-3 sm:px-4 rounded-xl font-medium transition-all 
                                 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base
                                 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 
                                 hover:to-pink-500/30 text-red-400 border border-red-500/20"
                    >
                        <X size={16} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Disconnect</span>
                    </button>
                )}

                <div className="flex-grow relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        onChange={(e) => {
                            setMessage(e.target.value);
                            typingHandle(e);
                        }}
                        value={message}
                        onKeyDown={handleKeyPress}
                        disabled={!receiver}
                        onBlur={(e) => {
                            // Prevent input from losing focus when send button is clicked
                            if (e.relatedTarget?.type === 'submit') {
                                e.preventDefault();
                                inputRef.current?.focus();
                            }
                        }}
                        className="w-full bg-zinc-800/50 text-white/90 rounded-xl px-4 h-10 sm:h-11
                                 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 
                                 border border-white/10 transition-all text-sm sm:text-base
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={!receiver || isSending || message.trim() === "" || isSearching}
                    onMouseDown={(e) => {
                        // Prevent the button mousedown from stealing focus
                        e.preventDefault();
                    }}
                    className="flex-shrink-0 h-10 sm:h-11 px-3 sm:px-4 rounded-xl font-medium
                             bg-gradient-to-r from-pink-500/20 to-purple-500/20 
                             hover:from-pink-500/30 hover:to-purple-500/30
                             border border-white/10 transition-all active:scale-95
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                             text-white/90 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    {isSending ? (
                        <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" />
                    ) : (
                        <Send size={16} className="sm:w-5 sm:h-5" />
                    )}
                    <span className="hidden sm:inline">Send</span>
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
