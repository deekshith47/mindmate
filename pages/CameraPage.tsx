import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { CameraIcon } from '../components/icons/Icons';
import Toolbar from '../components/Toolbar';
import { LanguageContext } from '../App';

const CameraPage: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photoData, setPhotoData] = useState<string | null>(null);

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false,
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            // In a real app, you might want to show a toast/error message to the user
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    }, [stream]);

    useEffect(() => {
        if (!photoData) {
            startCamera();
        }
        return () => {
            stopCamera();
        };
    }, [photoData, startCamera, stopCamera]);

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                // Flip the image horizontally to match the mirrored video feed
                context.translate(video.videoWidth, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/png');
                setPhotoData(dataUrl);
                stopCamera();
            }
        }
    };

    const retakePicture = () => {
        setPhotoData(null);
        // The useEffect hook will automatically call startCamera when photoData becomes null
    };
    
    const savePicture = () => {
      if(photoData) {
        const link = document.createElement('a');
        link.href = photoData;
        link.download = `mindmate-snapshot-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">{t('cameraPage.title')}</h1>
            <p className="text-gray-400">{t('cameraPage.description')}</p>
            
            <div className="relative w-full max-w-2xl aspect-video bg-gray-900/50 rounded-2xl border border-gray-700/50 overflow-hidden flex items-center justify-center shadow-lg">
                {photoData ? (
                    <img src={photoData} alt="Captured snapshot" className="object-contain h-full w-full" />
                ) : (
                    <>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }}
                        />
                        {!stream && <p className="absolute text-gray-400">{t('cameraPage.starting')}</p>}
                    </>
                )}
                 <canvas ref={canvasRef} className="hidden"></canvas>
            </div>

            <Toolbar>
                {photoData ? (
                    <>
                        <button onClick={retakePicture} className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-colors">{t('cameraPage.retake')}</button>
                        <button onClick={savePicture} className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">{t('cameraPage.save')}</button>
                    </>
                ) : (
                    <button 
                        onClick={takePicture} 
                        disabled={!stream}
                        className="p-4 rounded-full bg-white disabled:bg-gray-500 disabled:cursor-not-allowed group transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-violet-400"
                        aria-label={t('cameraPage.takePicture')}
                    >
                       <CameraIcon className="h-8 w-8 text-gray-900" />
                    </button>
                )}
            </Toolbar>
        </div>
    );
};

export default CameraPage;
