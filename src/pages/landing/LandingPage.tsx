import React, { useState } from 'react';
import BackgroundCanvas from '@/components/ui/BackgroundCanvas';
import LoginModal from '@/pages/auth/LoginModal';
import RegisterModal from '@/pages/auth/RegisterModal';

const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <BackgroundCanvas />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.06em] text-white">
            CLARION
          </h1>
          <p className="text-sm sm:text-base tracking-[0.2em] uppercase text-white/40 font-light">
            Decision Performance Intelligence
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            onClick={() => setShowLogin(true)}
            className="px-10 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/20 transition-all duration-300 min-w-[200px]"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="text-white/40 text-sm hover:text-white/70 transition-colors duration-300 tracking-wide"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
      />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
      />
    </div>
  );
};

export default LandingPage;
