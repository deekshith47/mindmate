import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Emotion } from '../types';

interface UseFaceEmotionProps {
    onEmotionChange: (emotion: Emotion) => void;
    videoRef: React.RefObject<HTMLVideoElement>;
}

interface EmotionScore {
    emotion: Emotion;
    score: number;
}

// Enhanced emotion classification with a more nuanced scoring system and a new detection hierarchy.
const classifyEmotion = (blendshapes: any[]): EmotionScore => {
    if (!blendshapes.length) return { emotion: 'Neutral', score: 1.0 };

    const categories = blendshapes[0].categories;
    const findScore = (name: string) => categories.find((c: any) => c.categoryName === name)?.score || 0;

    // --- Refined Scoring Logic ---
    const joyScore =
        (findScore('mouthSmileLeft') + findScore('mouthSmileRight')) * 0.5 +
        (findScore('cheekSquintLeft') + findScore('cheekSquintRight')) * 0.3 -
        (findScore('mouthFrownLeft') + findScore('mouthFrownRight')) * 0.4;

    const sadnessScore =
        (findScore('mouthFrownLeft') + findScore('mouthFrownRight')) * 0.4 +
        findScore('browInnerUp') * 0.3 +
        findScore('mouthShrugUpper') * 0.2 -
        (findScore('mouthSmileLeft') + findScore('mouthSmileRight')) * 0.4;

    const angerScore =
        (findScore('browDownLeft') + findScore('browDownRight')) * 0.6 +
        (findScore('mouthPressLeft') + findScore('mouthPressRight')) * 0.2 +
        findScore('lipFunnelUpper') * 0.2 -
        findScore('browInnerUp') * 0.3;

    const fearScore =
        (findScore('eyeWideLeft') + findScore('eyeWideRight')) * 0.4 +
        findScore('jawOpen') * 0.3 +
        findScore('mouthFunnel') * 0.2 +
        findScore('browInnerUp') * 0.1;

    const scores: EmotionScore[] = [
        { emotion: 'Joy', score: joyScore },
        { emotion: 'Sadness', score: sadnessScore },
        { emotion: 'Anger', score: angerScore },
        { emotion: 'Fear', score: fearScore },
    ];

    const dominantEmotion = scores.reduce((prev, current) => (prev.score > current.score) ? prev : current);

    // --- Determine Final Emotion with a new Hierarchy ---
    const CONFIDENCE_THRESHOLD = 0.3;

    // 1. Check for a strong, dominant emotion first.
    if (dominantEmotion.score > CONFIDENCE_THRESHOLD) {
        return dominantEmotion;
    }

    // 2. If no single emotion is strong, check for general calmness (low overall activation).
    const totalActivation =
        findScore('mouthSmileLeft') + findScore('mouthSmileRight') +
        findScore('mouthFrownLeft') + findScore('mouthFrownRight') +
        findScore('browDownLeft') + findScore('browDownRight') +
        findScore('browInnerUp') +
        findScore('eyeWideLeft') + findScore('eyeWideRight') +
        findScore('jawOpen');

    if (totalActivation < 0.5) {
        return { emotion: 'Calm', score: 1 - totalActivation };
    }

    // 3. If there's some activation but no clear emotion, it's Neutral.
    return { emotion: 'Neutral', score: 1.0 };
};


export const useFaceEmotion = ({ onEmotionChange, videoRef }: UseFaceEmotionProps) => {
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
    const [isMirrorOn, setIsMirrorOn] = useState(false);
    const lastVideoTimeRef = useRef(-1);
    const requestRef = useRef<number | null>(null);
    const lastEmotionRef = useRef<Emotion>('Neutral');
    const emotionHistoryRef = useRef<Emotion[]>([]);
    const lastChangeTimestampRef = useRef(0);
    const COOLDOWN_PERIOD = 500; // 500ms cooldown between emotion changes to prevent flickering.

    useEffect(() => {
        const createFaceLandmarker = async () => {
            try {
                const filesetResolver = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
                );
                const fl = await FaceLandmarker.createFromOptions(filesetResolver, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                        delegate: "GPU"
                    },
                    outputFaceBlendshapes: true,
                    runningMode: 'VIDEO',
                    numFaces: 1
                });
                setFaceLandmarker(fl);
            } catch (error) {
                console.error("Error creating FaceLandmarker:", error);
            }
        };
        createFaceLandmarker();
    }, []);

    const predictWebcam = useCallback(() => {
        const video = videoRef.current;
        if (!video || !faceLandmarker || video.readyState < 2) {
            requestRef.current = requestAnimationFrame(predictWebcam);
            return;
        }
        
        const startTimeMs = performance.now();
        if (video.currentTime !== lastVideoTimeRef.current) {
            lastVideoTimeRef.current = video.currentTime;
            const results = faceLandmarker.detectForVideo(video, startTimeMs);

            if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
                const { emotion: detectedEmotion } = classifyEmotion(results.faceBlendshapes);

                // --- Smoothing and Cooldown Logic ---
                emotionHistoryRef.current.push(detectedEmotion);
                if (emotionHistoryRef.current.length > 5) { // Shorter history for faster response
                    emotionHistoryRef.current.shift();
                }
                
                // FIX: Refactored from .reduce to a for...of loop for more stable type inference, fixing an issue where `count` was inferred as `unknown`.
                const emotionCounts: Record<string, number> = {};
                for (const emotion of emotionHistoryRef.current) {
                    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
                }

                let stableEmotion: Emotion = 'Neutral';
                let maxCount = 0;
                for (const [emotion, count] of Object.entries(emotionCounts)) {
                    if (count > maxCount) {
                        maxCount = count;
                        stableEmotion = emotion as Emotion;
                    }
                }
                
                const now = performance.now();
                if (stableEmotion !== lastEmotionRef.current && (now - lastChangeTimestampRef.current > COOLDOWN_PERIOD)) {
                    lastEmotionRef.current = stableEmotion;
                    lastChangeTimestampRef.current = now;
                    onEmotionChange(stableEmotion);
                }
            }
        }
        
        requestRef.current = requestAnimationFrame(predictWebcam);
    }, [faceLandmarker, onEmotionChange, videoRef]);


    const startWebcam = useCallback(async () => {
        if (isMirrorOn || !faceLandmarker) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener('loadeddata', () => {
                    setIsMirrorOn(true);
                    emotionHistoryRef.current = [];
                    lastChangeTimestampRef.current = performance.now();
                    requestRef.current = requestAnimationFrame(predictWebcam);
                });
            }
        } catch (error) {
            console.error("Error starting webcam for emotion detection:", error);
            setIsMirrorOn(false);
        }
    }, [isMirrorOn, faceLandmarker, predictWebcam, videoRef]);

    const stopWebcam = useCallback(() => {
        if (!isMirrorOn || !videoRef.current) return;

        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }

        const stream = videoRef.current.srcObject as MediaStream | null;
        stream?.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setIsMirrorOn(false);
        emotionHistoryRef.current = [];
        onEmotionChange('Neutral');
    }, [isMirrorOn, videoRef, onEmotionChange]);
    
    useEffect(() => {
       return () => {
           stopWebcam();
       }
    }, [stopWebcam]);

    return { isMirrorOn, startWebcam, stopWebcam };
};