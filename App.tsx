import React, { useState, useMemo, createContext, useEffect } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import JournalPage from './pages/JournalPage';
import CalmModePage from './pages/CalmModePage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ResourcesPage from './pages/ResourcesPage';
import GoalsPage from './pages/GoalsPage';
import LiveChatPage from './pages/LiveChatPage';
import CameraPage from './pages/CameraPage';
import SplashScreen from './components/SplashScreen';
import { Page, Emotion, JournalEntry, Goal, MoodEntry, Language } from './types';
import { EMOTION_COLORS, MOCK_JOURNAL_ENTRIES, MOCK_GOALS, MOCK_MOOD_DATA } from './constants';
import { translations } from './translations';
import { usePersistentState } from './hooks/usePersistentState';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number | null>) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});


const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('Chat');
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('Neutral');
  const [language, setLanguage] = usePersistentState<Language>('mindmate_language', 'en');

  const [journalEntries, setJournalEntries] = usePersistentState<JournalEntry[]>('mindmate_journal', MOCK_JOURNAL_ENTRIES);
  const [goals, setGoals] = usePersistentState<Goal[]>('mindmate_goals', MOCK_GOALS);
  const [moodData, setMoodData] = usePersistentState<MoodEntry[]>('mindmate_mood', MOCK_MOOD_DATA);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const t = (key: string, replacements?: Record<string, string | number | null>) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }

    if (typeof result === 'string' && replacements) {
      return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(`{${placeholder}}`, String(value));
      }, result);
    }
    
    return result as string;
  };

  const handleAddJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        ...entry,
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'progress' | 'created_at'>) => {
    const newGoal: Goal = {
        id: new Date().toISOString(),
        progress: 0,
        created_at: new Date().toISOString(),
        ...goal,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoalProgress = (id: string, newProgress: number) => {
    const cappedProgress = Math.max(0, Math.min(100, newProgress));
    setGoals(goals.map(goal => 
        goal.id === id ? { ...goal, progress: cappedProgress } : goal
    ));
  };
  
  const handleLogMood = (entry: Omit<MoodEntry, 'id'>) => {
      setMoodData(prev => {
          const existingIndex = prev.findIndex(m => m.date === entry.date);
          const newEntry = { ...entry, id: new Date().toISOString() };
          if (existingIndex > -1) {
              const updated = [...prev];
              updated[existingIndex] = { ...updated[existingIndex], ...newEntry };
              return updated;
          }
          return [...prev, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Chat':
        return <ChatPage setCurrentEmotion={setCurrentEmotion} currentEmotion={currentEmotion} />;
      case 'Live Chat':
        return <LiveChatPage />;
      case 'Dashboard':
        return <DashboardPage journalEntries={journalEntries} goals={goals} moodData={moodData} />;
      case 'Journal':
        return <JournalPage entries={journalEntries} onAddEntry={handleAddJournalEntry} />;
      case 'Calm Mode':
        return <CalmModePage />;
      case 'Mood Tracker':
        return <MoodTrackerPage moodData={moodData} onLogMood={handleLogMood} />;
      case 'Resources':
        return <ResourcesPage />;
      case 'Goals':
        return <GoalsPage goals={goals} onAddGoal={handleAddGoal} onUpdateProgress={handleUpdateGoalProgress} />;
      case 'Camera':
        return <CameraPage />;
      default:
        return <ChatPage setCurrentEmotion={setCurrentEmotion} currentEmotion={currentEmotion} />;
    }
  };
  
  const auraColor = useMemo(() => EMOTION_COLORS[currentEmotion], [currentEmotion]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {showSplash ? <SplashScreen /> : (
        <div className={`min-h-screen bg-gray-900 text-gray-100 font-sans transition-all duration-1000 ease-in-out`}>
          <div 
            className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${auraColor}10, transparent 60%)`,
            }}
          />
          <div
            className="fixed top-0 left-0 w-64 h-64 rounded-full -z-10 blur-3xl opacity-20 transition-all duration-1000 ease-in-out"
            style={{ background: auraColor, transform: 'translate(-20%, -20%)' }}
          ></div>
          <div
            className="fixed bottom-0 right-0 w-64 h-64 rounded-full -z-10 blur-3xl opacity-20 transition-all duration-1000 ease-in-out"
            style={{ background: auraColor, transform: 'translate(20%, 20%)' }}
          ></div>
          
          <Layout 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            setCurrentEmotion={setCurrentEmotion}
            currentEmotion={currentEmotion}
          >
            {renderPage()}
          </Layout>
        </div>
      )}
    </LanguageContext.Provider>
  );
};

export default App;