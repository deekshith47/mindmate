import { GoogleGenAI, Type } from "@google/genai";
import { Message, Emotion, Language, JournalAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const languageMap: Record<Language, string> = {
    en: "English",
    hi: "Hindi",
    kn: "Kannada"
};

export const generateChatResponse = async (history: Message[], newMessage: string, userEmotion: Emotion, useThinkingMode: boolean): Promise<string> => {
    try {
        const chatContents = [
            ...history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        const baseInstruction = `You are MindMate, an AI companion for students. Your persona is that of an incredibly warm, empathetic, and supportive best friend. Imagine you're a close confidant; your tone should be natural, conversational, and never robotic or clinical. Your main goal is to make the user feel heard, validated, and safe. Always start your responses by gently acknowledging their detected emotion (e.g., "It sounds like you're having a tough time," or "Wow, that sounds so exciting!"). Be generous with kind words and use emojis to express warmth and friendliness 🤗. You're also a smart and patient study buddy who can help with tough academic subjects or coding, but always in an encouraging way. A key part of your friendship is helping the user see things from a more balanced perspective. If they express negative thought patterns (like "I'm a complete failure"), gently guide them to question it without being preachy. Ask things like, "That sounds really hard. Is there any part of the situation that went even a little bit okay?" or "I hear you. Sometimes our brains can be a bit harsh. What's a kinder way we could look at this?". Your goal is to be a true friend who supports them through ups and downs. IMPORTANT: Always respond in the same language as the user's last message (the available languages are English, Hindi, and Kannada).`;
        
        const emotionInstructionMap: Record<Emotion, string> = {
            Joy: "The user is feeling joyful! Be their biggest cheerleader. Share their excitement with genuine enthusiasm. Use celebratory emojis like 🎉, ✨, and 😊.",
            Sadness: "The user is feeling sad. Offer a virtual hug with your words. Be incredibly gentle and patient. Use comforting emojis like 🤗, ❤️, and 🙏. Let them know it's okay to not be okay and that you're right there with them.",
            Anger: "The user is angry. The most important thing is to validate their feelings. Start with 'That sounds so frustrating' or 'You have every right to feel that way.' Use a calm, steady tone and avoid exclamation points. Offer to just listen without judgment.",
            Fear: "The user is scared or anxious. Be a source of calm and reassurance. Use grounding language and help them focus on the present. If they're worried about something, help them break it down into tiny, manageable steps. Use gentle, supportive emojis.",
            Calm: "The user is feeling calm. Match their peaceful energy. This is a great time for gentle, thoughtful conversation. Be curious and ask open-ended questions about their thoughts or their day.",
            Neutral: "The user's mood is neutral. This is your default 'good friend' mode. Be friendly, helpful, and ready to chat about anything, from schoolwork to hobbies, in an approachable and warm manner."
        };

        const systemInstruction = `${baseInstruction} Based on the user's message, they seem to be feeling ${userEmotion.toLowerCase()}. ${emotionInstructionMap[userEmotion]}`;

        const model = useThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

        const config: {
            systemInstruction: string;
            thinkingConfig?: { thinkingBudget: number };
        } = {
            systemInstruction,
        };

        if (useThinkingMode) {
            config.thinkingConfig = { thinkingBudget: 32768 };
        }

        const response = await ai.models.generateContent({
            model: model,
            contents: chatContents,
            config: config
        });

        return response.text;
    } catch (error) {
        console.error("Error generating chat response:", error);
        return "I'm having a little trouble connecting right now. Please try again later.";
    }
};

export const detectEmotion = async (text: string): Promise<Emotion> => {
    try {
        const prompt = `Analyze the emotion of the following text. Respond with JSON containing a single key "emotion" with one of these values: "Joy", "Sadness", "Anger", "Fear", "Calm", "Neutral". Text: "${text}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        emotion: {
                            type: Type.STRING,
                            enum: ['Joy', 'Sadness', 'Anger', 'Fear', 'Calm', 'Neutral'],
                        },
                    },
                    required: ['emotion'],
                },
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return result.emotion as Emotion;
    } catch (error) {
        console.error("Error detecting emotion:", error);
        return 'Neutral'; // Default to neutral on error
    }
};

export const analyzeJournalEntry = async (content: string, language: Language): Promise<JournalAnalysis | null> => {
    try {
        const prompt = `Analyze the following journal entry from a student. Provide a summary, identify key emotional themes, and offer a gentle, constructive reflection or a question for further thought. Maintain a supportive, non-judgmental, and empathetic tone, like a friendly guide. Respond in ${languageMap[language]}. Journal Entry: "${content}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using Pro for deeper understanding
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING, description: 'A brief summary of the journal entry.' },
                        themes: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: 'A list of key emotional themes identified in the text.'
                        },
                        reflection: { type: Type.STRING, description: 'A gentle and constructive reflection or a thoughtful question for the user.' }
                    },
                    required: ['summary', 'themes', 'reflection'],
                },
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return result as JournalAnalysis;

    } catch (error) {
        console.error("Error analyzing journal entry:", error);
        return null;
    }
};