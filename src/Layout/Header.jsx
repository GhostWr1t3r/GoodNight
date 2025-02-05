import React, { useEffect } from 'react';
import { useChat } from '../contextApi/ChatContext';
import { Users, Github } from 'lucide-react';

const Header = () => {
    const { onlineUsers, receiver, setIsTyping, setMessage, setReceiver } = useChat();
    
    useEffect(() => {
        if (receiver !== undefined && !onlineUsers.find((user) => user.userId === receiver)) {
            setIsTyping(false);
            setMessage("");
            setReceiver("");
        }
    }, [onlineUsers, receiver, setIsTyping, setMessage, setReceiver]);

    const handleDiscordClick = () => {
        window.open('https://discord.com/invite/bstJfQT3AZ', '_blank');
    };

    const handleGithubClick = () => {
        window.open('https://github.com/GhostWr1t3r/GoodNight', '_blank');
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Transparent Overlay Background */}
            <div className="absolute inset-0 bg-zinc-900/30 backdrop-blur-md" />
            
            {/* Main Header Content */}
            <div className="relative border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <a
                                href="/"
                                className="bg-white/5 px-3 py-2 rounded-xl flex items-center gap-2 group
                                          hover:bg-white/10 transition-all duration-300"
                            >
                                <span className="text-xl transform group-hover:rotate-12 transition-transform">🔗</span>
                                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text
                                           group-hover:from-pink-300 group-hover:to-purple-300 transition-all">
                                    GoodNight
                                </h1>
                            </a>
                        </div>

                        {/* Right Section: GitHub + Discord + Online Users */}
                        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                            {/* GitHub Button */}
                            <button
                                onClick={handleGithubClick}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl 
                                         bg-zinc-500/20 hover:bg-zinc-500/30 
                                         border border-zinc-500/20 transition-all duration-300"
                            >
                                <Github size={16} className="text-zinc-400"/>
                                <span className="text-sm text-white hidden sm:block">GitHub</span>
                            </button>

                            {/* Discord Button */}
                            <button
                                onClick={handleDiscordClick}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl 
                                         bg-indigo-500/20 hover:bg-indigo-500/30 
                                         border border-indigo-500/20 transition-all duration-300"
                            >
                                <svg 
                                    className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                >
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.127a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.216.642-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.834 19.834 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                                <span className="text-sm text-white hidden sm:block">Join Discord</span>
                            </button>

                            {/* Online Users Counter */}
                            <div className="flex items-center gap-2 bg-white/5 px-3 sm:px-4 py-2 rounded-xl 
                                          border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <Users size={16} className="text-purple-400 hidden sm:block"/>
                                <div className="flex items-baseline gap-1 sm:gap-2">
                                    <span className="text-white font-medium">{onlineUsers.length}</span>
                                    <span className="text-zinc-300 text-xs sm:text-sm">online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"/>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"/>
            </div>
        </div>
    );
};

export default Header;
