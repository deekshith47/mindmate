import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { EMOTION_COLORS } from '../constants';
import { Emotion, JournalEntry, Goal, MoodEntry } from '../types';
import { BadgeCheckIcon, BookOpenIcon, CheckCircleIcon, FireIcon } from '../components/icons/Icons';

interface DashboardPageProps {
    journalEntries: JournalEntry[];
    goals: Goal[];
    moodData: MoodEntry[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ journalEntries, goals, moodData }) => {
    
    const journalCount = journalEntries.length;
    const activeGoals = goals.length;
    const completedGoals = goals.filter(g => g.progress === 100).length;

    // Process mood trend for last 7 days from fetched data
    const trendData: Record<string, Record<string, number>> = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayName = date.toLocaleDateString('en-us', { weekday: 'short' });
        trendData[dayName] = { Joy: 0, Sadness: 0, Calm: 0, Anger: 0, Fear: 0, Neutral: 0 };
    }
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0,0,0,0);
    
    moodData.forEach(mood => {
        const moodDate = new Date(mood.date + 'T00:00:00');
        if (moodDate >= sevenDaysAgo) {
            const dayName = moodDate.toLocaleDateString('en-us', { weekday: 'short' });
            if (trendData[dayName] && trendData[dayName][mood.emotion] !== undefined) {
                trendData[dayName][mood.emotion]++;
            }
        }
    });

    const emotionTrend = Object.entries(trendData).map(([name, values]) => ({ name, ...values }));

    // Process emotion distribution
    const distribution = moodData.reduce((acc, mood) => {
        acc[mood.emotion] = (acc[mood.emotion] || 0) + 1;
        return acc;
    }, {} as Record<Emotion, number>);
    
    const emotionDistribution = Object.entries(distribution).map(([name, value]) => ({ name, value }));

    const achievements = [
        { name: 'First Journal Entry', icon: BookOpenIcon, earned: journalCount > 0 },
        { name: '7-Day Streak', icon: FireIcon, earned: false }, // Needs dedicated logic
        { name: 'Completed a Goal', icon: CheckCircleIcon, earned: completedGoals > 0 },
        { name: 'Mindful Moment', icon: BadgeCheckIcon, earned: true }, // Placeholder
    ];

    const StatCard: React.FC<{ title: string; value: string | number; icon: React.FC<{className?:string}> }> = ({ title, value, icon: Icon }) => (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 flex items-center space-x-4">
            <div className="p-3 bg-violet-500/20 rounded-lg">
                <Icon className="h-6 w-6 text-violet-400" />
            </div>
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Your Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Journal Entries" value={journalCount} icon={BookOpenIcon} />
                <StatCard title="Active Goals" value={activeGoals} icon={CheckCircleIcon} />
                <StatCard title="Current Streak" value="0 Days" icon={FireIcon} />
                <StatCard title="Mindful Minutes" value="0" icon={BadgeCheckIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-xl font-semibold mb-4">7-Day Emotion Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={emotionTrend}>
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
                            <Legend />
                            <Bar dataKey="Joy" stackId="a" fill={EMOTION_COLORS.Joy} />
                            <Bar dataKey="Sadness" stackId="a" fill={EMOTION_COLORS.Sadness} />
                            <Bar dataKey="Calm" stackId="a" fill={EMOTION_COLORS.Calm} />
                            <Bar dataKey="Anger" stackId="a" fill={EMOTION_COLORS.Anger} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-xl font-semibold mb-4">Emotion Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={emotionDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {emotionDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name as Emotion]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((ach) => (
                        <div key={ach.name} className={`p-4 rounded-xl border transition-all duration-300 ${ach.earned ? 'bg-amber-500/10 border-amber-500/50' : 'bg-gray-800/50 border-gray-700/50'}`}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`relative p-3 rounded-full ${ach.earned ? 'bg-amber-500/20' : 'bg-gray-700'}`}>
                                    <ach.icon className={`h-8 w-8 ${ach.earned ? 'text-amber-400' : 'text-gray-500'}`} />
                                    {ach.earned && <div className="absolute inset-0 rounded-full" style={{boxShadow: '0 0 15px #FBBF24'}}></div>}
                                </div>
                                <p className={`mt-2 font-semibold ${ach.earned ? 'text-white' : 'text-gray-400'}`}>{ach.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;