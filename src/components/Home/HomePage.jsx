import React, { useState } from 'react';
import { Shield, User, ArrowRight, ChevronLeft, Lock, Sparkles, Bell } from 'lucide-react';

const HomePage = ({ setIsTermsModal }) => {
  const [name, setName] = useState('');
  const [mode, setMode] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center p-4">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-24 md:w-32 h-24 md:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute bottom-1/4 -right-10 w-24 md:w-32 h-24 md:h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"/>
      </div>

      <div className="w-full max-w-md relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-3 -right-3 text-xl md:text-2xl animate-bounce">✨</div>
        
        <div className="relative bg-zinc-900/40 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border border-white/5
                      hover:border-white/10 transition-all duration-500">
          {/* Header Section */}
          <div className="relative mb-6 md:mb-10 text-center">
            <div 
              className="inline-flex items-center gap-2 mb-4 bg-white/5 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl
                         hover:bg-white/10 transition-all cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="text-xl md:text-2xl transform group-hover:rotate-12 transition-transform">🔗</span>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text
                           group-hover:from-pink-300 group-hover:to-purple-300 transition-all">
                GoodNight | NET3LIX
              </h1>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm font-medium flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-pink-500/70"/> 
              Connect • Love • Share
              <Sparkles size={12} className="text-purple-500/70"/>
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-3 md:space-y-4">
            {mode === 'named' ? (
              // {/* Commented out named user section
              // <div className="space-y-4 md:space-y-6 animate-fadeIn">
              //   <div className="relative group">
              //     <input
              //       type="text"
              //       value={name}
              //       onChange={(e) => setName(e.target.value)}
              //       placeholder="What's your name?"
              //       className="w-full px-4 md:px-5 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl
              //                text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50
              //                focus:ring-1 focus:ring-pink-500/50 transition-all text-base md:text-lg
              //                hover:bg-white/8"
              //     />
              //     <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 
              //                    group-hover:text-pink-500 transition-colors" size={16} />
              //   </div>
              //   <button
              //     onClick={() => setIsTermsModal(true)}
              //     className="w-full py-3 md:py-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10
              //              hover:from-pink-500/20 hover:to-purple-500/20 border border-white/10
              //              rounded-xl md:rounded-2xl text-white font-medium text-base md:text-lg transition-all
              //              hover:border-white/20 active:scale-98 group"
              //   >
              //     <span className="flex items-center justify-center gap-2">
              //       Begin Your Journey 
              //       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              //     </span>
              //   </button>
              //   <button 
              //     onClick={() => setMode(null)}
              //     className="w-full text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2
              //              hover:gap-3 py-2"
              //   >
              //     <ChevronLeft size={14} />
              //     <span className="text-sm md:text-base">Back</span>
              //   </button>
              // </div>
              // End commented section */}
              null
            ) : mode === 'anonymous' ? (
              <div className="space-y-4 md:space-y-6 animate-fadeIn">
                <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:bg-white/8 transition-all">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg md:rounded-xl">
                      <Lock size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium mb-1 md:mb-2 flex items-center gap-2 text-sm md:text-base">
                        Anonymous Mode <span className="text-lg md:text-xl">🎭</span>
                      </h3>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                        Express yourself freely while maintaining privacy
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsTermsModal(true)}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10
                           hover:from-pink-500/20 hover:to-purple-500/20 border border-white/10
                           rounded-xl md:rounded-2xl text-white font-medium text-base md:text-lg transition-all
                           hover:border-white/20 active:scale-98 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Enter Anonymously
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </span>
                </button>
                <button 
                  onClick={() => setMode(null)}
                  className="w-full text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2
                           hover:gap-3 py-2"
                >
                  <ChevronLeft size={14} />
                  <span className="text-sm md:text-base">Back</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Commented out named join button
                <button
                  onClick={() => setMode('named')}
                  className="w-full p-4 md:p-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl
                           flex items-center justify-between text-white/90 group
                           hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-xl transform group-hover:rotate-12 transition-transform">👋</span>
                    <span className="font-medium text-sm md:text-base">Join with your name</span>
                  </div>
                  <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all"/>
                </button>
                */}

                <button
                  onClick={() => setMode('anonymous')}
                  className="w-full p-4 md:p-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl
                           flex items-center justify-between text-white/90 group
                           hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-xl transform group-hover:rotate-12 transition-transform">🎭</span>
                    <span className="font-medium text-sm md:text-base">Join anonymously</span>
                  </div>
                  <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all"/>
                </button>
              </div>
            )}
          </div>

          {/* Features Section */}
          {!mode && (
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/10 hover:bg-white/10 
                             transition-all group cursor-pointer">
                  <span className="text-xl md:text-2xl mb-2 block transform group-hover:scale-110 transition-transform">🥂</span>
                  <h3 className="text-white/90 font-medium mb-1 text-sm md:text-base">Dates</h3>
                  <p className="text-zinc-500 text-xs md:text-sm">Find your perfect match</p>
                </div>
                <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/10 hover:bg-white/10 
                             transition-all group cursor-pointer">
                  <span className="text-xl md:text-2xl mb-2 block transform group-hover:scale-110 transition-transform">💭</span>
                  <h3 className="text-white/90 font-medium mb-1 text-sm md:text-base">Discussions</h3>
                  <p className="text-zinc-500 text-xs md:text-sm">Share ideas</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-white/5 flex items-center justify-center gap-2 group">
            <Bell size={10} className="text-zinc-600 group-hover:text-pink-500 transition-colors"/>
            <p className="text-zinc-600 text-xs md:text-sm group-hover:text-zinc-400 transition-colors">
              GoodNight • NET3LIX. 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
