import React from 'react';
import { Wifi, Loader2, Sparkles } from 'lucide-react';

const NetworkError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black font-sans">
      <div className="w-full max-w-md mx-auto p-3 sm:p-4">
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
          {/* Icon */}
          <div className="relative">
            <div className="relative bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-full">
              <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
              <span className="absolute -top-1 -right-1 animate-ping">
                <Loader2 className="w-4 h-4 text-red-400" />
              </span>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white/90">
              Connection Lost
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Error connecting to server. Please try again.
            </p>
          </div>

          {/* Button */}
          <button 
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 
                     hover:from-pink-500/20 hover:to-purple-500/20 border border-white/10 rounded-xl 
                     text-white/90 font-medium transition-all hover:border-white/20 active:scale-95
                     flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            New Chat
          </button>

          {/* Checkbox Container */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-zinc-400">Find strangers with common interests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
