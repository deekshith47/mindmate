import React, { useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '../App';
import { useLiveConversation } from '../hooks/useLiveConversation';
import { MicrophoneIcon, WaveformIcon } from '../components/icons/Icons';

const LiveChatPage: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const { status, transcripts, startConversation, stopConversation, error } = useLiveConversation();
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    const isSessionActive = status === 'connected' || status === 'connecting';

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcripts]);

    const handleToggleConversation = () => {
        if (isSessionActive) {
            stopConversation();
        } else {
            startConversation();
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'idle':
                return t('liveChat.status.idle');
            case 'connecting':
                return t('liveChat.status.connecting');
            case 'connected':
                return t('liveChat.status.connected');
            case 'error':
                return t('liveChat.status.error');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-8 p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold">{t('liveChat.title')}</h1>
                <p className="text-gray-400 mt-2 max-w-xl">{t('liveChat.description')}</p>
            </div>

            <div className="w-full max-w-2xl h-96 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 flex flex-col">
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {transcripts.map((entry, index) => (
                        <div key={index} className={`flex ${entry.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-prose">
                                <p className={`font-bold ${entry.sender === 'user' ? 'text-violet-400 text-right' : 'text-emerald-400'}`}>
                                    {entry.sender === 'user' ? t('liveChat.user') : t('liveChat.bot')}
                                </p>
                                <p className="text-white">{entry.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={transcriptEndRef} />
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleToggleConversation}
                    disabled={status === 'connecting'}
                    className={`px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-lg
                        ${isSessionActive ? 'bg-red-600 hover:bg-red-500 shadow-red-500/30' : 'bg-violet-600 hover:bg-violet-500 shadow-violet-500/30'}
                        ${status === 'connecting' && 'opacity-50 cursor-not-allowed'}
                    `}
                >
                    {isSessionActive ? <WaveformIcon className="h-6 w-6" /> : <MicrophoneIcon className="h-6 w-6" />}
                    <span>{isSessionActive ? t('liveChat.stopButton') : t('liveChat.startButton')}</span>
                </button>
                <p className="text-gray-400 mt-4 min-h-[1.5rem]">
                    {error || getStatusText()}
                </p>
            </div>
        </div>
    );
};

export default LiveChatPage;