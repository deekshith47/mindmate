import { supabase } from './supabaseClient';
import { Message, JournalEntry, Goal, MoodEntry } from '../types';

// Helper to get current user
const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Messages
export const getMessages = async (): Promise<Message[]> => {
    const user = await getCurrentUser();
    if (!user) return [];
    const { data, error } = await supabase.from('messages').select('*').eq('user_id', user.id).order('created_at', { ascending: true });
    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
    return data || [];
};

export const addMessage = async (message: Omit<Message, 'id' | 'created_at' | 'user_id'>): Promise<Message | null> => {
    const user = await getCurrentUser();
    if (!user) return null;
    const { data, error } = await supabase.from('messages').insert([{ ...message, user_id: user.id }]).select().single();
    if (error) {
        console.error('Error adding message:', error);
        return null;
    }
    return data;
};

export const updateMessageFeedback = async (messageId: string, rating: 'good' | 'bad', comment?: string) => {
    const { error } = await supabase.from('messages').update({ feedback: { rating, comment } }).eq('id', messageId);
    if (error) console.error('Error updating feedback:', error);
};


// Journal Entries
export const getJournalEntries = async (): Promise<JournalEntry[]> => {
    const user = await getCurrentUser();
    if (!user) return [];
    const { data, error } = await supabase.from('journal_entries').select('*').eq('user_id', user.id).order('date', { ascending: false });
    if (error) {
        console.error('Error fetching journal entries:', error);
        return [];
    }
    return data || [];
};

export const addJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'user_id'>): Promise<JournalEntry | null> => {
    const user = await getCurrentUser();
    if (!user) return null;
    const { data, error } = await supabase.from('journal_entries').insert([{...entry, user_id: user.id}]).select().single();
    if (error) {
        console.error('Error adding journal entry:', error);
        return null;
    }
    return data;
};

// Goals
export const getGoals = async (): Promise<Goal[]> => {
    const user = await getCurrentUser();
    if (!user) return [];
    const { data, error } = await supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: true });
    if (error) {
        console.error('Error fetching goals:', error);
        return [];
    }
    return data || [];
};

export const addGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'user_id'>): Promise<Goal | null> => {
    const user = await getCurrentUser();
    if (!user) return null;
    const { data, error } = await supabase.from('goals').insert([{ ...goal, user_id: user.id }]).select().single();
    if (error) {
        console.error('Error adding goal:', error);
        return null;
    }
    return data;
};

export const updateGoalProgress = async (id: string, progress: number) => {
    const { error } = await supabase.from('goals').update({ progress }).eq('id', id);
    if (error) console.error('Error updating goal progress:', error);
};

// Mood Entries
export const getMoodEntries = async (year: number, month: number): Promise<MoodEntry[]> => {
    const user = await getCurrentUser();
    if (!user) return [];
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = new Date(year, month + 1, 1).toISOString().split('T')[0];
    
    const { data, error } = await supabase.from('mood_entries').select('*').eq('user_id', user.id).gte('date', startDate).lt('date', endDate);
    if (error) {
        console.error('Error fetching mood entries:', error);
        return [];
    }
    return data || [];
};

export const getAllMoodEntries = async (): Promise<MoodEntry[]> => {
    const user = await getCurrentUser();
    if (!user) return [];
    const { data, error } = await supabase.from('mood_entries').select('*').eq('user_id', user.id);
    if (error) {
        console.error('Error fetching all mood entries:', error);
        return [];
    }
    return data || [];
};

export const upsertMood = async (entry: Omit<MoodEntry, 'id' | 'user_id'>): Promise<MoodEntry | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    // This performs a select and then an insert/update. This is safer if we can't assume a specific DB constraint.
    const { data: existing, error: selectError } = await supabase
        .from('mood_entries')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', entry.date)
        .single();
    
    // PGRST116: "exact one row not found", which is expected for an insert.
    if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking for existing mood:', selectError);
        return null;
    }
    
    if (existing) {
        // Update
        const { data, error } = await supabase
            .from('mood_entries')
            .update({ emotion: entry.emotion })
            .eq('id', existing.id)
            .select()
            .single();
        if (error) console.error('Error updating mood:', error);
        return data;
    } else {
        // Insert
        const { data, error } = await supabase
            .from('mood_entries')
            .insert({ ...entry, user_id: user.id })
            .select()
            .single();
        if (error) console.error('Error inserting mood:', error);
        return data;
    }
};
