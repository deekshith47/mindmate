export type Emotion = 'Joy' | 'Sadness' | 'Anger' | 'Fear' | 'Calm' | 'Neutral';

export type Page = 'Chat' | 'Dashboard' | 'Journal' | 'Calm Mode' | 'Mood Tracker' | 'Resources' | 'Goals';

export interface Message {
  id: string;
  user_id?: string;
  created_at?: string;
  text: string;
  sender: 'user' | 'bot';
  emotion?: Emotion;
  feedback?: {
    rating: 'good' | 'bad' | null;
    comment?: string;
  };
}

export interface JournalEntry {
  id?: string;
  user_id?: string;
  date: string;
  content: string;
  emotion: Emotion;
}

export interface Goal {
  id?: string;
  user_id?: string;
  created_at?: string;
  title: string;
  category: 'Wellness' | 'Mindfulness' | 'Social' | 'Personal';
  progress: number;
}

export interface MoodEntry {
  id?: string;
  user_id?: string;
  date: string; // YYYY-MM-DD
  emotion: Emotion;
}
