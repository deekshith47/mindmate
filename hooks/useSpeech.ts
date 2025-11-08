import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}
interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onend: () => void;
    onerror: (event: { error: any }) => void;
    start: () => void;
    stop: () => void;
}

const SpeechRecognitionAPI: SpeechRecognitionStatic | undefined = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const languageLocaleMap: Record<Language, string> = {
    en: 'en-US',
    hi: 'hi-IN',
    kn: 'kn-IN'
};

export const useSpeech = (language: Language) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const isSupported = !!SpeechRecognitionAPI && 'speechSynthesis' in window;

    useEffect(() => {
        if (!isSupported) {
            console.warn("Speech recognition or synthesis is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognitionAPI!();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = languageLocaleMap[language];

        recognition.onresult = (event) => {
            const fullTranscript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            setTranscript(fullTranscript);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
               recognitionRef.current.stop();
            }
        };
    }, [isSupported, language]);

    const startListening = useCallback(() => {
        if (isListening || !recognitionRef.current) return;
        setTranscript('');
        recognitionRef.current.lang = languageLocaleMap[language];
        recognitionRef.current.start();
        setIsListening(true);
    }, [isListening, language]);

    const stopListening = useCallback(() => {
        if (!isListening || !recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    }, [isListening]);

    const speak = useCallback((text: string) => {
        if (!isSupported) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageLocaleMap[language];
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }, [isSupported, language]);
    
    const cancelSpeech = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
    }, [isSupported]);


    return { isListening, transcript, startListening, stopListening, speak, isSupported, cancelSpeech };
};