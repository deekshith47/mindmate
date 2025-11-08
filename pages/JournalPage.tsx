import React, { useState, useMemo, useContext } from 'react';
import { JournalEntry, Emotion, JournalAnalysis } from '../types';
import { JOURNAL_PROMPTS, EMOTION_COLORS } from '../constants';
import { PlusIcon, ThinkingIcon, SpinnerIcon } from '../components/icons/Icons';
import { LanguageContext } from '../App';
import { analyzeJournalEntry } from '../services/geminiService';

interface JournalPageProps {
    entries: JournalEntry[];
    onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
}

const JournalPage: React.FC<JournalPageProps> = ({ entries, onAddEntry }) => {
    const { t, language } = useContext(LanguageContext);
    const [newEntryContent, setNewEntryContent] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('Neutral');
    const [analysis, setAnalysis] = useState<JournalAnalysis | null>(null);
    const [analyzingId, setAnalyzingId] = useState<string | null>(null);
    
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

    const handleAnalyzeEntry = async (entry: JournalEntry) => {
        if (!entry.id) return;
        setAnalyzingId(entry.id);
        setAnalysis(null);

        const result = await analyzeJournalEntry(entry.content, language);
        setAnalysis(result);
        
        setAnalyzingId(null);
    };


    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{t('journal.title')}</h1>
            
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 space-y-4">
                <p className="text-gray-400 italic">{t('journal.promptLabel')}: "{currentPrompt}"</p>
                <textarea
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    className="w-full bg-gray-900/50 p-4 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder={t('journal.placeholder')}
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">{t('journal.feelingPrompt')}</span>
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
                        {t('journal.addEntryButton')}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('journal.pastEntriesTitle')}</h2>
                {entries.length > 0 ? (
                    entries.map(entry => (
                        <div 
                            key={entry.id} 
                            className="bg-gray-800/30 p-5 rounded-xl border border-transparent hover:border-gray-600/50 transition-all duration-300"
                            style={{borderLeft: `4px solid ${EMOTION_COLORS[entry.emotion]}`}}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-white">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <span className="text-sm px-2 py-1 rounded-full" style={{backgroundColor: `${EMOTION_COLORS[entry.emotion]}30`, color: EMOTION_COLORS[entry.emotion]}}>{entry.emotion}</span>
                            </div>
                            <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
                            <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-end">
                                <button
                                    onClick={() => handleAnalyzeEntry(entry)}
                                    disabled={!!analyzingId}
                                    className="flex items-center px-4 py-2 rounded-lg bg-gray-700/50 text-violet-300 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-wait text-sm font-semibold transition-colors"
                                >
                                    {analyzingId === entry.id ? (
                                        <SpinnerIcon className="h-5 w-5 mr-2" />
                                    ) : (
                                        <ThinkingIcon className="h-5 w-5 mr-2" />
                                    )}
                                    {analyzingId === entry.id ? t('journal.analyzing') : t('journal.analyzeButton')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">{t('journal.noEntries')}</p>
                )}
            </div>

            {analysis && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setAnalysis(null)}>
                    <div 
                        className="relative w-full max-w-lg bg-gray-800/80 border border-violet-500/50 rounded-2xl p-8 shadow-2xl shadow-black/50 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                         <button onClick={() => setAnalysis(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl">&times;</button>
                        <h2 className="text-2xl font-bold text-violet-400">{t('journal.analysisModalTitle')}</h2>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-1">{t('journal.analysisSummary')}</h3>
                            <p className="text-gray-400">{analysis.summary}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">{t('journal.analysisThemes')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {analysis.themes.map((theme, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-gray-700/50 text-sm text-gray-200">{theme}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-1">{t('journal.analysisReflection')}</h3>
                            <p className="text-gray-400 italic">{analysis.reflection}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JournalPage;