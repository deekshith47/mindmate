import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import JournalPage from './pages/JournalPage';
import CalmModePage from './pages/CalmModePage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ResourcesPage from './pages/ResourcesPage';
import GoalsPage from './pages/GoalsPage';
import { Page, Emotion, JournalEntry, Goal, MoodEntry } from './types';
import { EMOTION_COLORS, MOCK_JOURNAL_ENTRIES, MOCK_GOALS, MOCK_MOOD_DATA } from './constants';
import { LogoIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Chat');
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('Neutral');

  // Lifted state for global data management, initialized with mock data
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(MOCK_JOURNAL_ENTRIES);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [moodData, setMoodData] = useState<MoodEntry[]>(MOCK_MOOD_DATA);

  // Handlers for updating local state
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
          return [...prev, newEntry];
      });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Chat':
        return <ChatPage setCurrentEmotion={setCurrentEmotion} />;
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
      default:
        return <ChatPage setCurrentEmotion={setCurrentEmotion} />;
    }
  };
  
  const auraColor = useMemo(() => EMOTION_COLORS[currentEmotion], [currentEmotion]);

  return (
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
      >
        {renderPage()}
      </Layout>
    </div>
  );
};

export default App;
