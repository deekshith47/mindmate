import React, { useState, useMemo, useContext } from 'react';
import { Emotion, MoodEntry } from '../types';
import { EMOTION_COLORS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LanguageContext } from '../App';

interface MoodTrackerPageProps {
    moodData: MoodEntry[];
    onLogMood: (entry: Omit<MoodEntry, 'id'>) => void;
}

const MoodTrackerPage: React.FC<MoodTrackerPageProps> = ({ moodData, onLogMood }) => {
    const { t, language } = useContext(LanguageContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const currentMonthMoods = useMemo(() => {
        return moodData.filter(entry => {
            const entryDate = new Date(entry.date + 'T00:00:00');
            return entryDate.getFullYear() === currentDate.getFullYear() &&
                   entryDate.getMonth() === currentDate.getMonth();
        });
    }, [moodData, currentDate]);


    const moodCounts = currentMonthMoods.reduce((acc, entry) => {
        acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
        return acc;
    }, {} as Record<Emotion, number>);

    const chartData = Object.entries(moodCounts).map(([name, value]) => ({ name, value }));

    const getMoodForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return currentMonthMoods.find(m => m.date === dateStr);
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };
    
    const handleDayClick = (day: number) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleLogMoodAction = (emotion: Emotion) => {
        if (!selectedDay) return;
        const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
        
        onLogMood({ date: dateStr, emotion });

        setIsModalOpen(false);
        setSelectedDay(null);
    };
    
    const locale = language === 'en' ? 'default' : language;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{t('mood.title')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => changeMonth(-1)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">&lt;</button>
                        <h2 className="text-xl font-semibold">{currentDate.toLocaleString(locale, { month: 'long', year: 'numeric' })}</h2>
                        <button onClick={() => changeMonth(1)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                        {t('mood.days').split(',').map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                            const day = dayIndex + 1;
                            const mood = getMoodForDay(day);
                            return (
                                <button key={day} onClick={() => handleDayClick(day)} className="relative w-full aspect-square flex items-center justify-center rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                                    <span className="text-gray-300">{day}</span>
                                    {mood && (
                                        <div 
                                            className="absolute top-1 right-1 w-3 h-3 rounded-full"
                                            style={{ backgroundColor: EMOTION_COLORS[mood.emotion] }}
                                            title={mood.emotion}
                                        ></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-xl font-semibold mb-4">{t('mood.summaryTitle')}</h2>
                    {chartData.length > 0 ? (
                        <>
                         <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5}>
                                    {chartData.map((entry) => (
                                        <Cell key={entry.name} fill={EMOTION_COLORS[entry.name as Emotion]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                          {chartData.map(entry => (
                              <div key={entry.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: EMOTION_COLORS[entry.name as Emotion]}}></div>
                                  <span>{entry.name}</span>
                                </div>
                                <span>{((Number(entry.value) / currentMonthMoods.length) * 100).toFixed(0)}%</span>
                              </div>
                          ))}
                        </div>
                        </>
                    ) : (
                        <p className="text-gray-400 text-center mt-16">{t('mood.noData')}</p>
                    )}
                </div>
            </div>
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
                    <div className="relative w-full max-w-sm bg-gray-800/80 border border-gray-700/50 rounded-2xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4 text-center">{t('mood.modalTitle', {day: selectedDay})}</h2>
                         <div className="grid grid-cols-3 gap-4">
                            {Object.entries(EMOTION_COLORS).map(([emotion, color]) => (
                                <button
                                    key={emotion}
                                    onClick={() => handleLogMoodAction(emotion as Emotion)}
                                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: `${color}40` }}
                                >
                                    <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: color }}></div>
                                    <span className="font-semibold" style={{ color: color }}>{emotion}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoodTrackerPage;