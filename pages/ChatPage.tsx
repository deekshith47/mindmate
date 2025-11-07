import React, { useState, useEffect, useRef } from 'react';
import { Message, Emotion } from '../types';
import { generateChatResponse, detectEmotion } from '../services/geminiService';
import { useSpeech } from '../hooks/useSpeech';
import { ArrowUpIcon, MicrophoneIcon, MusicNoteIcon, ThumbsUpIcon, ThumbsDownIcon } from '../components/icons/Icons';
import { EMOTION_COLORS, SPOTIFY_PLAYLISTS } from '../constants';

interface ChatPageProps {
  setCurrentEmotion: (emotion: Emotion) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ setCurrentEmotion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [lastUserEmotion, setLastUserEmotion] = useState<Emotion>('Neutral');
  const [feedbackTarget, setFeedbackTarget] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');

  const { isListening, transcript, startListening, stopListening, speak, isSupported } = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
        { id: 'initial-1', text: "Hello! I'm MindMate. How are you feeling today?", sender: 'bot', emotion: 'Neutral', feedback: { rating: null } }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
  
    const userMessageText = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
  
    setInput('');
    setIsLoading(true);
  
    try {
      const emotion = await detectEmotion(userMessageText);
      setCurrentEmotion(emotion);
      setLastUserEmotion(emotion);
      
      const botResponseText = await generateChatResponse(messages, userMessageText, emotion);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        emotion,
        feedback: { rating: null }
      };

      setMessages(prev => [...prev, botMessage]);

      // Remove emojis from the text before speaking for a cleaner audio experience.
      const textToSpeak = botResponseText.replace(/\p{Extended_Pictographic}/gu, '');
      speak(textToSpeak);
    } catch (error) {
      console.error("Error in chat flow:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I encountered an error. Let's try that again.", sender: 'bot', feedback: { rating: null } };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleRateMessage = (messageId: string, rating: 'good' | 'bad') => {
    setMessages(prev => prev.map(m => 
        m.id === messageId ? { ...m, feedback: { ...(m.feedback || {}), rating } } : m
    ));
    if (rating === 'bad') {
        setFeedbackTarget(messageId);
    }
  };

  const handleFeedbackSubmit = () => {
      if (!feedbackTarget) return;
      setMessages(prev => prev.map(m => 
          m.id === feedbackTarget ? { ...m, feedback: { ...m.feedback!, comment: feedbackComment } } : m
      ));

      setFeedbackTarget(null);
      setFeedbackComment('');
  };

  const emotionColor = EMOTION_COLORS[lastUserEmotion];
  const playlist = SPOTIFY_PLAYLISTS[lastUserEmotion];

  return (
    <div className="h-full flex flex-col bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/20">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-violet-600' : 'bg-gray-700'}`}>
                <p className="text-white">{msg.text}</p>
              </div>
              {msg.sender === 'bot' && msg.id !== 'initial-1' && msg.id && (
                <div className="flex items-center space-x-1">
                    <button onClick={() => handleRateMessage(msg.id!, 'good')} disabled={!!msg.feedback?.rating}>
                        <ThumbsUpIcon className={`h-5 w-5 transition-colors ${msg.feedback?.rating === 'good' ? 'text-emerald-400' : 'text-gray-500 hover:text-emerald-400'}`} />
                    </button>
                    <button onClick={() => handleRateMessage(msg.id!, 'bad')} disabled={!!msg.feedback?.rating}>
                        <ThumbsDownIcon className={`h-5 w-5 transition-colors ${msg.feedback?.rating === 'bad' ? 'text-red-400' : 'text-gray-500 hover:text-red-400'}`} />
                    </button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md p-4 rounded-2xl bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-700/50 bg-gray-800/50 rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowSpotifyModal(true)} 
            className="p-3 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            style={{ color: emotionColor }}
          >
            <MusicNoteIcon className="h-6 w-6" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message or use the mic..."
            className="w-full bg-gray-700/50 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
            rows={1}
          />
          {isSupported && (
            <button 
              onClick={handleVoiceInput}
              className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <MicrophoneIcon className="h-6 w-6" />
            </button>
          )}
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-full transition-colors ${
              (input.trim() && !isLoading)
                ? 'bg-white text-gray-900 hover:bg-gray-200'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowUpIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {showSpotifyModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowSpotifyModal(false)}>
              <div className="relative w-full max-w-md bg-gray-800/80 border border-gray-700 rounded-2xl p-8 text-center shadow-2xl shadow-black/50"
                  style={{ borderColor: emotionColor }}
                  onClick={(e) => e.stopPropagation()}
              >
                  <button onClick={() => setShowSpotifyModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">&times;</button>
                  <h2 className="text-2xl font-bold mb-2">Feeling <span style={{ color: emotionColor }}>{lastUserEmotion}</span>?</h2>
                  <p className="text-gray-400 mb-6">Here's a playlist that might match your mood: <span className="font-bold text-white">{playlist.name}</span></p>
                  <div className="text-left mb-6 bg-gray-900/50 p-4 rounded-lg">
                      {playlist.tracks.map((track, i) => (
                          <p key={i} className="text-gray-300 py-1"><span className="text-gray-500 mr-2">{i+1}.</span>{track}</p>
                      ))}
                  </div>
                  <a href={playlist.link} target="_blank" rel="noopener noreferrer" 
                      className="inline-block px-8 py-3 rounded-lg text-white font-bold transition-all duration-300"
                      style={{ background: emotionColor, boxShadow: `0 0 20px ${emotionColor}80` }}
                  >
                      Open on Spotify
                  </a>
              </div>
          </div>
      )}
      {feedbackTarget && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setFeedbackTarget(null)}>
              <div className="relative w-full max-w-md bg-gray-800/80 border border-red-500/50 rounded-2xl p-8 shadow-2xl shadow-black/50"
                  onClick={(e) => e.stopPropagation()}
              >
                  <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
                  <p className="text-gray-400 mb-4">Sorry to hear the response wasn't helpful. Please let us know what went wrong.</p>
                  <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      className="w-full bg-gray-900/50 p-3 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Your feedback..."
                  />
                  <div className="flex justify-end gap-4 mt-4">
                      <button onClick={() => setFeedbackTarget(null)} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500">Cancel</button>
                      <button onClick={handleFeedbackSubmit} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500">Submit</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ChatPage;
