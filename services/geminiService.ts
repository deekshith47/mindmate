import { GoogleGenAI, Type } from "@google/genai";
import { Message, Emotion } from '../types';

// The API key is expected to be set as an environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash';

export const generateChatResponse = async (history: Message[], newMessage: string, userEmotion: Emotion): Promise<string> => {
    try {
        const chatContents = [
            ...history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        const baseInstruction = "You are MindMate, an AI companion for students focused on mental well-being. Your persona is that of a warm, empathetic, and non-judgmental friend. Your primary goal is to provide a safe space for users to express their feelings. Keep responses supportive, concise, and constructive. Use emojis to convey warmth and friendliness.";
        
        const emotionInstructionMap: Record<Emotion, string> = {
            Joy: "The user seems joyful. Share in their happiness and be encouraging.",
            Sadness: "The user seems sad. Be gentle, offer comfort, and listen patiently. You can suggest a calming activity if appropriate.",
            Anger: "The user seems angry. Remain calm and validate their feelings without being confrontational. Offer a way for them to vent or cool down.",
            Fear: "The user seems scared or anxious. Be reassuring and provide a sense of safety. Break down problems into smaller steps if they are overwhelmed.",
            Calm: "The user seems calm. Maintain a peaceful and supportive tone.",
            Neutral: "The user seems to be in a neutral mood. Be helpful and friendly."
        };

        const systemInstruction = `${baseInstruction} Based on the user's message, they seem to be feeling ${userEmotion.toLowerCase()}. ${emotionInstructionMap[userEmotion]}`;

        const response = await ai.models.generateContent({
            model: model,
            contents: chatContents,
            config: {
                systemInstruction,
            }
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
            model: model,
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