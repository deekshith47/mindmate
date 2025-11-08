import React, { useState, useContext } from 'react';
import { Goal } from '../types';
import { PlusIcon } from '../components/icons/Icons';
import { LanguageContext } from '../App';

const getGoalTemplates = (t: (key: string) => string) => [
    { title: t('goals.templates.mindfulness'), category: 'Mindfulness' },
    { title: t('goals.templates.journaling'), category: 'Personal' },
    { title: t('goals.templates.exercise'), category: 'Wellness' },
    { title: t('goals.templates.sleep'), category: 'Wellness' },
    { title: t('goals.templates.gratitude'), category: 'Mindfulness' },
    { title: t('goals.templates.connect'), category: 'Social' },
];

interface GoalsPageProps {
    goals: Goal[];
    onAddGoal: (goal: Omit<Goal, 'id' | 'progress' | 'created_at'>) => void;
    onUpdateProgress: (id: string, newProgress: number) => void;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ goals, onAddGoal, onUpdateProgress }) => {
    const { t } = useContext(LanguageContext);
    const [customGoalTitle, setCustomGoalTitle] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const goalTemplates = getGoalTemplates(t);

    const handleAddGoal = (title: string, category: Goal['category']) => {
        onAddGoal({ title, category });
    };
    
    const handleAddCustomGoal = () => {
        const title = customGoalTitle.trim();
        if (title === '') return;
        
        onAddGoal({ title, category: 'Personal' });

        setCustomGoalTitle('');
        setShowCustomInput(false);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{t('goals.title')}</h1>
            
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                <h2 className="text-xl font-semibold mb-4">{t('goals.addNew')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {goalTemplates.map(template => (
                        <button
                            key={template.title}
                            onClick={() => handleAddGoal(template.title, template.category as Goal['category'])}
                            className="flex items-center text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                            <PlusIcon className="h-5 w-5 mr-2 text-violet-400" />
                            <span>{template.title}</span>
                        </button>
                    ))}
                </div>
                {showCustomInput ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customGoalTitle}
                            onChange={e => setCustomGoalTitle(e.target.value)}
                            placeholder={t('goals.customPlaceholder')}
                            className="flex-grow bg-gray-900/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                             onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCustomGoal();
                                }
                            }}
                        />
                        <button onClick={handleAddCustomGoal} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500">{t('goals.addButton')}</button>
                    </div>
                ) : (
                    <button onClick={() => setShowCustomInput(true)} className="w-full p-3 rounded-lg border-2 border-dashed border-gray-600 hover:bg-gray-700/50 text-gray-400">
                        {t('goals.createCustom')}
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('goals.activeGoals')}</h2>
                 {goals.length > 0 ? (
                    goals.map(goal => (
                        <div key={goal.id} className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold">{goal.title}</span>
                                <span className="text-sm px-2 py-1 rounded-full bg-violet-500/20 text-violet-300">{goal.category}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-violet-500 h-2.5 rounded-full" style={{ width: `${goal.progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                                </div>
                                <span className="font-bold text-lg">{goal.progress}%</span>
                                {goal.id && <button onClick={() => onUpdateProgress(goal.id!, goal.progress + 10)} className="px-2 py-1 rounded bg-gray-700 text-xs">+</button>}
                            </div>
                        </div>
                    ))
                ) : (
                     <p className="text-gray-400">{t('goals.noGoals')}</p>
                )}
            </div>
        </div>
    );
};

export default GoalsPage;