import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import { LanguageContext } from '../App';

type Exercise = '4-7-8' | 'Box' | 'Resonant' | 'PMR' | 'Visualization' | 'Scan';

const getExercises = (t: (key: string) => string): Record<Exercise, { name: string; description: string }> => ({
    '4-7-8': { name: t('calm.exercises.478.name'), description: t('calm.exercises.478.desc') },
    'Box': { name: t('calm.exercises.box.name'), description: t('calm.exercises.box.desc') },
    'Resonant': { name: t('calm.exercises.resonant.name'), description: t('calm.exercises.resonant.desc') },
    'PMR': { name: t('calm.exercises.pmr.name'), description: t('calm.exercises.pmr.desc') },
    'Visualization': { name: t('calm.exercises.visualization.name'), description: t('calm.exercises.visualization.desc') },
    'Scan': { name: t('calm.exercises.scan.name'), description: t('calm.exercises.scan.desc') },
});


const CalmModePage: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const exercises = getExercises(t);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{t('calm.title')}</h1>
            <p className="text-gray-400">{t('calm.description')}</p>
            
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
    const { t, language } = useContext(LanguageContext);
    const { speak, cancelSpeech } = useSpeech(language);
    const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
    const [step, setStep] = useState(0);
    const [animationState, setAnimationState] = useState('paused');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const exercises = getExercises(t);

    const getExerciseConfig = useCallback(() => {
        switch (exercise) {
            case '4-7-8': return [
                { text: t('calm.steps.breatheIn', { seconds: 4 }), duration: 4000, anim: 'grow' },
                { text: t('calm.steps.hold', { seconds: 7 }), duration: 7000, anim: 'hold' },
                { text: t('calm.steps.breatheOut', { seconds: 8 }), duration: 8000, anim: 'shrink' },
            ];
            case 'Box': return [
                { text: t('calm.steps.breatheIn', { seconds: 4 }), duration: 4000, anim: 'grow' },
                { text: t('calm.steps.hold', { seconds: 4 }), duration: 4000, anim: 'hold' },
                { text: t('calm.steps.breatheOut', { seconds: 4 }), duration: 4000, anim: 'shrink' },
                { text: t('calm.steps.hold', { seconds: 4 }), duration: 4000, anim: 'hold' },
            ];
            case 'Resonant': return [
                { text: t('calm.steps.breatheIn', { seconds: 5 }), duration: 5000, anim: 'grow' },
                { text: t('calm.steps.breatheOut', { seconds: 5 }), duration: 5000, anim: 'shrink' },
            ];
            case 'PMR': return [
                { text: "Tense your feet.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
                { text: "Tense your calves.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
                { text: "Tense your thighs.", duration: 5000, anim: 'hold' }, { text: "Release.", duration: 5000, anim: 'shrink' },
            ];
            case 'Visualization': return [
                { text: "Picture a calm beach.", duration: 10000, anim: 'hold' },
                { text: "Feel the warm sun.", duration: 10000, anim: 'hold' },
                { text: "Hear the gentle waves.", duration: 10000, anim: 'hold' },
            ];
            case 'Scan': return [
                { text: "Focus on your toes.", duration: 7000, anim: 'hold' },
                { text: "Move to your feet.", duration: 7000, anim: 'hold' },
                { text: "Sense your ankles.", duration: 7000, anim: 'hold' },
            ];
            default: return [];
        }
    }, [exercise, t]);
    
    const config = getExerciseConfig();

    const runStep = useCallback((currentStep: number) => {
        if (currentStep >= config.length * 3) {
            setStatus('finished');
            setAnimationState('paused');
            speak(t('calm.steps.complete'));
            return;
        }

        const currentConfig = config[currentStep % config.length];
        speak(currentConfig.text);
        setAnimationState(currentConfig.anim);

        timerRef.current = setTimeout(() => {
            setStep(currentStep + 1);
            runStep(currentStep + 1);
        }, currentConfig.duration);
    }, [config, speak, t]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            cancelSpeech();
        };
    }, [cancelSpeech]);

    const handleStart = () => {
        setStatus('running');
        setStep(0);
        speak(`${t('calm.steps.starting')} ${exercises[exercise].name}. ${t('calm.steps.getReady')}.`);
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
            
            <p className="text-xl h-12 text-center text-white">{status === 'running' ? config[step % config.length]?.text : t('calm.steps.ready')}</p>
            
            <div className="flex space-x-4 mt-8">
                <button onClick={onBack} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500">{t('calm.backButton')}</button>
                {status !== 'running' ? (
                    <button onClick={handleStart} className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500">{t('calm.startButton')}</button>
                ) : (
                    <button onClick={handleStop} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500">{t('calm.stopButton')}</button>
                )}
            </div>
        </div>
    );
};

export default CalmModePage;