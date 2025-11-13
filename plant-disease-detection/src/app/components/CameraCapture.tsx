'use client';
import { useRef, useState, useEffect } from 'react';
import { predictDisease } from '@/lib/modelUtils';
import { PredictionResult } from '@/types1';

interface CameraCaptureProps {
  setResults: (results: PredictionResult[]) => void;
  setLoading: (loading: boolean) => void;
}

export default function CameraCapture({ setResults, setLoading }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Use back camera
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        setError('Camera access denied. Please enable camera permissions.');
        console.error('Camera error:', err);
      }
    };

    if (cameraActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

  const captureImage = async () => {
    if (!videoRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      
      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      
      // Convert to data URL
      const imageUrl = canvas.toDataURL('image/jpeg');
      
      // Get predictions
      const predictions = await predictDisease(imageUrl);
      setResults(predictions);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error('Capture error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {!cameraActive ? (
        <button
          onClick={() => setCameraActive(true)}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Enable Camera
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-green-100">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-2 ring-green-300/20 rounded-lg" />
          </div>

          <button
            onClick={captureImage}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Capture Image</span>
            <span className="text-xl">🌿</span>
          </button>
        </div>
      )}
    </div>
  );
}