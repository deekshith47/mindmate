import React from 'react';
import { LogoIcon } from './icons/Icons';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white animate-fade-in">
        <style>
            {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 1.5s ease-in-out;
                }
                @keyframes pulse-glow {
                    0%, 100% {
                        transform: scale(1);
                        filter: drop-shadow(0 0 10px #8B5CF680);
                    }
                    50% {
                        transform: scale(1.05);
                        filter: drop-shadow(0 0 20px #8B5CF6);
                    }
                }
                .animate-pulse-glow {
                    animation: pulse-glow 3s infinite ease-in-out;
                }
            `}
        </style>
        <div className="animate-pulse-glow">
            <LogoIcon className="h-24 w-24 text-violet-400" />
        </div>
      <h1 className="text-4xl font-bold mt-6">MindMate</h1>
      <p className="text-gray-400 mt-2">Your Emotion-Aware Student Companion</p>
    </div>
  );
};

export default SplashScreen;
