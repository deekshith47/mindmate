import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Label } from 'recharts';
import { EMOTION_COLORS } from '../constants';
import { Emotion, JournalEntry, Goal, MoodEntry } from '../types';
import { BadgeCheckIcon, BookOpenIcon, CheckCircleIcon, FireIcon } from '../components/icons/Icons';
import { LanguageContext } from '../App';

interface DashboardPageProps {
    journalEntries: JournalEntry[];
    goals: Goal[];
    moodData: MoodEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 p-3 rounded-lg shadow-lg">
                <p className="font-bold text-white mb-2">{label}</p>
                {payload.map((entry: any) => (
                    <div key={entry.name} className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                        <p style={{ color: entry.color }}>{`${entry.name}: ${entry.value}`}</p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const DashboardPage: React.FC<DashboardPageProps> = ({ journalEntries, goals, moodData }) => {
    const { t } = useContext(LanguageContext);
    
    // Memoize all expensive calculations
    const journalCount = useMemo(() => journalEntries.length, [journalEntries]);
    const activeGoals = useMemo(() => goals.filter(g => g.progress < 100).length, [goals]);
    const completedGoals = useMemo(() => goals.filter(g => g.progress === 100).length, [goals]);

    const emotionTrend = useMemo(() => {
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

        return Object.entries(trendData).map(([name, values]) => ({ name, ...values }));
    }, [moodData]);

    const emotionDistribution = useMemo(() => {
        const distribution = moodData.reduce((acc, mood) => {
            acc[mood.emotion] = (acc[mood.emotion] || 0) + 1;
            return acc;
        }, {} as Record<Emotion, number>);
        
        return Object.entries(distribution).map(([name, value]) => ({ name: name as Emotion, value }));
    }, [moodData]);
    
    const goalProgressData = useMemo(() => goals
        .filter(g => g.progress < 100)
        .map(g => ({ name: g.title, Progress: g.progress }))
        .slice(0, 5), // show top 5 active goals
    [goals]);

    const achievements = useMemo(() => [
        { name: t('dashboard.achievements.firstJournal'), icon: BookOpenIcon, earned: journalCount > 0 },
        { name: t('dashboard.achievements.streak'), icon: FireIcon, earned: false }, // Needs dedicated logic
        { name: t('dashboard.achievements.completedGoal'), icon: CheckCircleIcon, earned: completedGoals > 0 },
        { name: t('dashboard.achievements.mindfulMoment'), icon: BadgeCheckIcon, earned: true }, // Placeholder
    ], [t, journalCount, completedGoals]);

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
    
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null; // Don't render label for tiny slices

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
                {`${name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{t('dashboard.title')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={t('dashboard.stats.journalEntries')} value={journalCount} icon={BookOpenIcon} />
                <StatCard title={t('dashboard.stats.activeGoals')} value={activeGoals} icon={CheckCircleIcon} />
                <StatCard title={t('dashboard.stats.currentStreak')} value={`0 ${t('dashboard.stats.days')}`} icon={FireIcon} />
                <StatCard title={t('dashboard.stats.mindfulMinutes')} value="0" icon={BadgeCheckIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-xl font-semibold mb-4">{t('dashboard.charts.trendTitle')}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={emotionTrend}>
                            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}/>
                            <Bar dataKey="Joy" stackId="a" fill={EMOTION_COLORS.Joy} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Sadness" stackId="a" fill={EMOTION_COLORS.Sadness} />
                            <Bar dataKey="Calm" stackId="a" fill={EMOTION_COLORS.Calm} />
                            <Bar dataKey="Anger" stackId="a" fill={EMOTION_COLORS.Anger} />
                            <Bar dataKey="Fear" stackId="a" fill={EMOTION_COLORS.Fear} />
                            <Bar dataKey="Neutral" stackId="a" fill={EMOTION_COLORS.Neutral} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">{t('dashboard.charts.distributionTitle')}</h2>
                     {emotionDistribution.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={emotionDistribution} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100} 
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                    {emotionDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name as Emotion]} stroke={EMOTION_COLORS[entry.name as Emotion]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                     ) : (
                         <div className="flex-1 flex items-center justify-center text-gray-500">{t('mood.noData')}</div>
                     )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-xl font-semibold mb-4">{t('goals.activeGoals')}</h2>
                    {goalProgressData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={goalProgressData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" tickFormatter={(tick) => `${tick}%`} fontSize={12} />
                                <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={100} tick={{ fontSize: 12, fill: '#D1D5DB' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
                                <Bar dataKey="Progress" fill={EMOTION_COLORS.Calm} radius={[0, 4, 4, 0]} barSize={15}>
                                    {goalProgressData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={EMOTION_COLORS.Calm} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">{t('goals.noGoals')}</div>
                    )}
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <h2 className="text-2xl font-bold mb-4">{t('dashboard.achievements.title')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full content-center">
                        {achievements.map((ach) => (
                            <div key={ach.name} className={`p-4 rounded-xl border transition-all duration-300 ${ach.earned ? 'bg-amber-500/10 border-amber-500/50' : 'bg-gray-800/50 border-gray-700/50'}`}>
                                <div className="flex flex-col items-center text-center">
                                    <div className={`relative p-3 rounded-full ${ach.earned ? 'bg-amber-500/20' : 'bg-gray-700'}`}>
                                        <ach.icon className={`h-8 w-8 ${ach.earned ? 'text-amber-400' : 'text-gray-500'}`} />
                                        {ach.earned && <div className="absolute inset-0 rounded-full" style={{boxShadow: '0 0 15px #FBBF24'}}></div>}
                                    </div>
                                    <p className={`mt-2 font-semibold text-xs ${ach.earned ? 'text-white' : 'text-gray-400'}`}>{ach.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;