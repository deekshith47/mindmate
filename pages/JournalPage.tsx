import React, { useState, useMemo } from 'react';
import { JournalEntry, Emotion } from '../types';
import { JOURNAL_PROMPTS, EMOTION_COLORS } from '../constants';
import { PlusIcon } from '../components/icons/Icons';

interface JournalPageProps {
    entries: JournalEntry[];
    onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
}

const JournalPage: React.FC<JournalPageProps> = ({ entries, onAddEntry }) => {
    const [newEntryContent, setNewEntryContent] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('Neutral');
    
    const currentPrompt = useMemo(() => JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)], []);

    const handleAddEntry = () => {
        if (newEntryContent.trim() === '') return;
        onAddEntry({
            content: newEntryContent,
            emotion: selectedEmotion,
        });
        setNewEntryContent('');
        setSelectedEmotion('Neutral');
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Your Journal</h1>
            
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 space-y-4">
                <p className="text-gray-400 italic">Prompt: "{currentPrompt}"</p>
                <textarea
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    className="w-full bg-gray-900/50 p-4 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Write about your day..."
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">How are you feeling?</span>
                        <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-full">
                            {Object.keys(EMOTION_COLORS).map((emotion) => (
                                <button
                                    key={emotion}
                                    onClick={() => setSelectedEmotion(emotion as Emotion)}
                                    className={`w-8 h-8 rounded-full transition-transform duration-200 ${selectedEmotion === emotion ? 'ring-2 ring-white scale-110' : ''}`}
                                    style={{ backgroundColor: EMOTION_COLORS[emotion as Emotion] }}
                                    title={emotion}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleAddEntry}
                        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Entry
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Past Entries</h2>
                {entries.length > 0 ? (
                    entries.map(entry => (
                        <div 
                            key={entry.id} 
                            className="bg-gray-800/30 p-5 rounded-xl border border-transparent hover:border-gray-600 transition-all duration-300"
                            style={{borderLeft: `4px solid ${EMOTION_COLORS[entry.emotion]}`}}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-white">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <span className="text-sm px-2 py-1 rounded-full" style={{backgroundColor: `${EMOTION_COLORS[entry.emotion]}30`, color: EMOTION_COLORS[entry.emotion]}}>{entry.emotion}</span>
                            </div>
                            <p className="text-gray-300">{entry.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">You haven't written any entries yet.</p>
                )}
            </div>
        </div>
    );
};

export default JournalPage;