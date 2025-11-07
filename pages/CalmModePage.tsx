import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSpeech } from '../hooks/useSpeech';

type Exercise = '4-7-8' | 'Box' | 'Resonant' | 'PMR' | 'Visualization' | 'Scan';

const exercises: Record<Exercise, { name: string; description: string }> = {
    '4-7-8': { name: '4-7-8 Breathing', description: "Dr. Weil's technique to calm the nervous system." },
    'Box': { name: 'Box Breathing', description: 'A Navy SEAL method for managing stress with 4-second intervals.' },
    'Resonant': { name: 'Resonant Breathing', description: 'Breathe at 5-6 breaths/min to improve heart rate variability.' },
    'PMR': { name: 'Progressive Muscle Relaxation', description: 'A guided 10-step process of tensing and relaxing muscle groups.' },
    'Visualization': { name: 'Guided Visualization', description: 'Journey through 7 peaceful scenes to relax your mind.' },
    'Scan': { name: 'Body Scan Meditation', description: 'An 18-part mindful awareness practice from head to toe.' },
};

const CalmModePage: React.FC = () => {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Calm Mode</h1>
            <p className="text-gray-400">Choose an exercise to relax, refocus, and find your center. All exercises include voice guidance.</p>
            
            {selectedExercise ? (
                <ExercisePlayer exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(exercises).map(([key, { name, description }]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedExercise(key as Exercise)}
                            className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-left hover:bg-gray-700/50 hover:-translate-y-1 transition-all duration-300"
                        >
                            <h2 className="text-xl font-bold text-violet-400 mb-2">{name}</h2>
                            <p className="text-gray-300">{description}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const ExercisePlayer: React.FC<{ exercise: Exercise; onBack: () => void }> = ({ exercise, onBack }) => {
    const { speak, cancelSpeech } = useSpeech();
    const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
    const [step, setStep] = useState(0);
    const [animationState, setAnimationState] = useState('paused');
    // FIX: Pass an initial value of `null` to `useRef` to resolve the "Expected 1 arguments, but got 0" error.
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getExerciseConfig = useCallback(() => {
        // Define steps for each exercise
        switch (exercise) {
            case '4-7-8': return [
                { text: "Breathe in for 4 seconds.", duration: 4000, anim: 'grow' },
                { text: "Hold for 7 seconds.", duration: 7000, anim: 'hold' },
                { text: "Breathe out for 8 seconds.", duration: 8000, anim: 'shrink' },
            ];
            case 'Box': return [
                { text: "Breathe in for 4 seconds.", duration: 4000, anim: 'grow' },
                { text: "Hold for 4 seconds.", duration: 4000, anim: 'hold' },
                { text: "Breathe out for 4 seconds.", duration: 4000, anim: 'shrink' },
                { text: "Hold for 4 seconds.", duration: 4000, anim: 'hold' },
            ];
            case 'Resonant': return [
                { text: "Breathe in for 5 seconds.", duration: 5000, anim: 'grow' },
                { text: "Breathe out for 5 seconds.", duration: 5000, anim: 'shrink' },
            ];
            case 'PMR': return [
                { text: "Tense your feet.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
                { text: "Tense your calves.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
                { text: "Tense your thighs.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
                // ... more steps
            ];
            case 'Visualization': return [
                { text: "Picture a calm beach.", duration: 10000, anim: 'hold' },
                { text: "Feel the warm sun.", duration: 10000, anim: 'hold' },
                { text: "Hear the gentle waves.", duration: 10000, anim: 'hold' },
                // ... more scenes
            ];
            case 'Scan': return [
                { text: "Focus on your toes.", duration: 7000, anim: 'hold' },
                { text: "Move to your feet.", duration: 7000, anim: 'hold' },
                { text: "Sense your ankles.", duration: 7000, anim: 'hold' },
                // ... more body parts
            ];
            default: return [];
        }
    }, [exercise]);
    
    const config = getExerciseConfig();

    const runStep = useCallback((currentStep: number) => {
        if (currentStep >= config.length * 3) { // Run 3 cycles for breathing
            setStatus('finished');
            setAnimationState('paused');
            speak("Exercise complete. Well done.");
            return;
        }

        const currentConfig = config[currentStep % config.length];
        speak(currentConfig.text);
        setAnimationState(currentConfig.anim);

        timerRef.current = setTimeout(() => {
            setStep(currentStep + 1);
            runStep(currentStep + 1);
        }, currentConfig.duration);
    }, [config, speak]);

    useEffect(() => {
        return () => {
            // FIX: Pass the timer ID to clearTimeout. Calling it without an argument causes a runtime error.
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            cancelSpeech();
        };
    }, [cancelSpeech]);

    const handleStart = () => {
        setStatus('running');
        setStep(0);
        speak(`Starting ${exercises[exercise].name}. Get ready.`);
        timerRef.current = setTimeout(() => runStep(0), 3000);
    };

    const handleStop = () => {
        setStatus('idle');
        setStep(0);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        cancelSpeech();
        setAnimationState('paused');
    };

    const isBreathingExercise = ['4-7-8', 'Box', 'Resonant'].includes(exercise);
    
    const animationStyles: React.CSSProperties = {
        transition: `transform ${animationState === 'hold' ? '0.5s' : (config[step % config.length]?.duration/1000 || 4)}s ease-in-out`,
        transform: animationState === 'grow' ? 'scale(1.5)' : animationState === 'shrink' ? 'scale(1)' : 'scale(1.25)',
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">{exercises[exercise].name}</h2>
            <p className="text-gray-400 mb-8">{exercises[exercise].description}</p>
            
            {isBreathingExercise && (
                <div className="relative w-48 h-48 flex items-center justify-center my-8">
                    <div className="absolute w-full h-full bg-violet-500/10 rounded-full animate-pulse"></div>
                    <div 
                        className="w-32 h-32 bg-violet-500 rounded-full"
                        style={animationStyles}
                    ></div>
                </div>
            )}
            
            <p className="text-xl h-12 text-center text-white">{status === 'running' ? config[step % config.length]?.text : 'Ready when you are.'}</p>
            
            <div className="flex space-x-4 mt-8">
                <button onClick={onBack} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500">Back</button>
                {status !== 'running' ? (
                    <button onClick={handleStart} className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500">Start</button>
                ) : (
                    <button onClick={handleStop} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500">Stop</button>
                )}
            </div>
        </div>
    );
};

export default CalmModePage;