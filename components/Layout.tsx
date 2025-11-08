import React, { useContext, useRef } from 'react';
import { Page, Language, Emotion, NavItemName } from '../types';
import { NAV_ITEMS, EMOTION_COLORS } from '../constants';
import { LogoIcon } from './icons/Icons';
import { LanguageContext } from '../App';
import { useFaceEmotion } from '../hooks/useFaceEmotion';

const LANGUAGES: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
];

interface LayoutProps {
    children: React.ReactNode;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    setCurrentEmotion: (emotion: Emotion) => void;
    currentEmotion: Emotion;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, setCurrentEmotion, currentEmotion }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMirrorOn, startWebcam, stopWebcam } = useFaceEmotion({ onEmotionChange: setCurrentEmotion, videoRef });

  const handleToggleMirror = () => {
    if (isMirrorOn) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  const handleNavClick = (name: NavItemName) => {
    if (name === 'Emotion Mirror') {
        handleToggleMirror();
    } else {
        setCurrentPage(name as Page);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <nav className="w-full md:w-64 bg-gray-900/50 backdrop-blur-lg border-b md:border-b-0 md:border-r border-gray-700/50 p-4 shrink-0 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
            <LogoIcon className="h-10 w-10 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">MindMate</h1>
        </div>
        
        <div className="flex-grow flex flex-col overflow-y-auto pr-2 -mr-2">
          <ul className="space-y-2 flex-grow">
            {NAV_ITEMS.map((item) => {
              const isToggle = item.name === 'Emotion Mirror';
              const isActive = isToggle ? isMirrorOn : currentPage === item.name;

              return (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.name)}
                  title={t(item.tKey)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-violet-500/30 text-white font-semibold'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {t(item.tKey)}
                </button>
              </li>
            )})}
          </ul>
        </div>

        <div className="flex-shrink-0 mt-4">
          {/* Container for Emotion Mirror video and overlay */}
          <div className={`relative mt-4 transition-all duration-500 overflow-hidden ${isMirrorOn ? 'opacity-100 max-h-56' : 'opacity-0 max-h-0'}`}>
              <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto rounded-lg object-cover border-2 border-gray-700/50"
                  style={{ transform: 'scaleX(-1)' }} // Mirror the video
              ></video>
              {isMirrorOn && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg text-center">
                      <p className="text-white font-semibold uppercase tracking-wider text-sm" style={{ color: EMOTION_COLORS[currentEmotion] }}>
                          {currentEmotion}
                      </p>
                  </div>
              )}
          </div>
          
           <div className="mt-4">
                <div className="flex bg-gray-700/50 rounded-lg p-1">
                    {LANGUAGES.map(lang => (
                        <button 
                            key={lang.code} 
                            onClick={() => setLanguage(lang.code)}
                            className={`flex-1 text-sm py-1 rounded-md transition-colors ${
                                language === lang.code 
                                ? 'bg-violet-600 text-white font-semibold' 
                                : 'text-gray-300 hover:bg-gray-600/50'
                            }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </nav>
      <main className="relative flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;