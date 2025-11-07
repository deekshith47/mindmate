import { useState, useEffect, useRef, useCallback } from 'react';

// FIX: Define the SpeechRecognition interface to provide types for the Web Speech API,
// resolving the "Cannot find name 'SpeechRecognition'" error.
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

// Polyfill for browsers that have webkitSpeechRecognition but not SpeechRecognition
// Fix: Cast window to any to access vendor-prefixed properties and rename to avoid name collision with the SpeechRecognition type.
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeech = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const isSupported = !!SpeechRecognitionAPI && 'speechSynthesis' in window;

    useEffect(() => {
        if (!isSupported) {
            console.warn("Speech recognition or synthesis is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript(finalTranscript);
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
            recognition.stop();
        };
    }, [isSupported]);

    const startListening = useCallback(() => {
        if (isListening || !recognitionRef.current) return;
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (!isListening || !recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    }, [isListening]);

    const speak = useCallback((text: string) => {
        if (!isSupported) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }, [isSupported]);
    
    const cancelSpeech = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
    }, [isSupported]);


    return { isListening, transcript, startListening, stopListening, speak, isSupported, cancelSpeech };
};