import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsModal = ({ setIsTermsModal }) => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  
  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-24 md:w-32 h-24 md:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute bottom-1/4 -right-10 w-24 md:w-32 h-24 md:h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"/>
      </div>

      <div className="w-full max-w-md relative">
        {/* Modal Content */}
        <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 
                      shadow-2xl border border-white/10 animate-fadeIn">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsTermsModal(false)}
            className="absolute -top-2 -right-2 p-2 bg-white/10 rounded-full 
                     hover:bg-white/20 transition-all text-white/70 hover:text-white/90"
          >
            <X size={20} />
          </button>

          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Lock size={20} className="text-purple-400" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white/90">
              Age Verification
            </h2>
          </div>

          {/* Checkbox Section */}
          <div className="space-y-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start">
                <input
                  type="checkbox"
                  checked={check}
                  onChange={() => setCheck(!check)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 
                           checked:bg-gradient-to-r checked:from-pink-500 checked:to-purple-500
                           focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </div>
              <span className="text-white/70 text-sm md:text-base leading-relaxed">
                By checking this box, I confirm that I am <strong className="text-white/90">18 years or older</strong> and 
                agree to comply with the platform's terms of service and community guidelines.
              </span>
            </label>

            {/* Submit Button */}
            <button
              onClick={navigateToChat}
              disabled={!check}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-pink-500 to-purple-500
                       disabled:from-zinc-600 disabled:to-zinc-700 disabled:cursor-not-allowed
                       rounded-xl md:rounded-2xl text-white font-medium text-base md:text-lg 
                       transition-all hover:opacity-90 active:scale-98 disabled:opacity-50"
            >
              Confirm & Continue
            </button>
          </div>

          {/* Footer Text */}
          <p className="mt-6 text-center text-zinc-500 text-xs md:text-sm">
            Your safety and privacy are our top priorities
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
