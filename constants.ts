import React from 'react';
import { NavItemName, Page, Emotion, JournalEntry, Goal, MoodEntry } from './types';
import { ChartIcon, ChatBubbleIcon, BookOpenIcon, HeartIcon, CalendarIcon, AcademicCapIcon, CheckCircleIcon, WaveformIcon, FaceSmileIcon, CameraIcon } from './components/icons/Icons';

export const NAV_ITEMS: { name: NavItemName; icon: React.FC<{className?: string}>; tKey: string }[] = [
  { name: 'Chat', icon: ChatBubbleIcon, tKey: 'nav.chat' },
  { name: 'Dashboard', icon: ChartIcon, tKey: 'nav.dashboard' },
  { name: 'Journal', icon: BookOpenIcon, tKey: 'nav.journal' },
  { name: 'Calm Mode', icon: HeartIcon, tKey: 'nav.calmMode' },
  { name: 'Mood Tracker', icon: CalendarIcon, tKey: 'nav.moodTracker' },
  { name: 'Resources', icon: AcademicCapIcon, tKey: 'nav.resources' },
  { name: 'Goals', icon: CheckCircleIcon, tKey: 'nav.goals' },
  { name: 'Live Chat', icon: WaveformIcon, tKey: 'nav.liveChat' },
  { name: 'Emotion Mirror', icon: FaceSmileIcon, tKey: 'nav.emotionMirror' },
  { name: 'Camera', icon: CameraIcon, tKey: 'nav.camera' },
];

export const EMOTION_COLORS: Record<Emotion, string> = {
  Joy: '#FBBF24', // amber-400
  Sadness: '#60A5FA', // blue-400
  Anger: '#F87171', // red-400
  Fear: '#A78BFA', // violet-400
  Calm: '#34D399', // emerald-400
  Neutral: '#9CA3AF', // gray-400
};

export const SPOTIFY_PLAYLISTS: Record<Emotion, {name: string, tracks: string[], link: string}> = {
    Joy: { name: "Happy Vibes", tracks: ["Happy - Pharrell Williams", "Don't Stop Me Now - Queen", "Walking on Sunshine - Katrina & The Waves", "Good as Hell - Lizzo", "Uptown Funk - Mark Ronson ft. Bruno Mars"], link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aJc1uA" },
    Sadness: { name: "Lo-fi Comfort", tracks: ["Weightless - Marconi Union", "Clair de Lune - Claude Debussy", "Someone Like You - Adele", "Hallelujah - Leonard Cohen", "Fix You - Coldplay"], link: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui02mwM" },
    Anger: { name: "Power Release", tracks: ["B.Y.O.B. - System Of A Down", "Killing In The Name - Rage Against The Machine", "Break Stuff - Limp Bizkit", "Down with the Sickness - Disturbed", "Chop Suey! - System Of A Down"], link: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRonReA4E" },
    Fear: { name: "Peaceful Haven", tracks: ["Gymnopédie No. 1 - Erik Satie", "Spiegel im Spiegel - Arvo Pärt", "Orinoco Flow - Enya", "Watermark - Enya", "Adagio for Strings - Samuel Barber"], link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
    Calm: { name: "Meditation Space", tracks: ["Ambient 1: Music for Airports - Brian Eno", "Holocene - Bon Iver", "Recomposed by Max Richter: Vivaldi, The Four Seasons - Max Richter", "Strobe - deadmau5", "Teardrop - Massive Attack"], link: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFv56R" },
    Neutral: { name: "Focus Flow", tracks: ["Music for 18 Musicians - Steve Reich", "Metamorphosis: Metamorphosis One - Philip Glass", "Nuvole Bianche - Ludovico Einaudi", "In A Landscape - John Cage", "The Arts and the Hours - Jean-Philippe Rameau"], link: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" }
};

export const JOURNAL_PROMPTS = [
    "What was the best part of your day and why?",
    "Describe a challenge you faced recently and how you handled it.",
    "What are three things you're grateful for right now?",
    "If you could give your younger self one piece of advice, what would it be?",
    "Write about a person who has had a positive impact on your life.",
    "What is one goal you want to accomplish this week?"
];

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  { id: '1', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), content: 'Felt really productive today. Finished my big assignment and had time to relax.', emotion: 'Joy' },
  { id: '2', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), content: 'A bit stressed about the upcoming exams. Need to make a study plan.', emotion: 'Fear' },
];

export const MOCK_GOALS: Goal[] = [
  { id: 'g1', title: 'Daily mindfulness', category: 'Mindfulness', progress: 70, created_at: new Date().toISOString() },
  { id: 'g2', title: '30 minutes of exercise', category: 'Wellness', progress: 40, created_at: new Date().toISOString() },
];

export const MOCK_MOOD_DATA: MoodEntry[] = [
  { id: 'm1', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], emotion: 'Joy' },
  { id: 'm2', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], emotion: 'Calm' },
  { id: 'm3', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0], emotion: 'Fear' },
];