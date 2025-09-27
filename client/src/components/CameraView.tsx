import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, CameraOff, RotateCcw, Settings, Target } from 'lucide-react';
import type { PoseTemplate, CameraSettings } from '@shared/schema';

interface CameraViewProps {
  selectedPose: PoseTemplate | null;
  settings: CameraSettings;
  onScoreUpdate: (score: number, stable: boolean) => void;
  onPhotoCapture: (imageData: string) => void;
}

export default function CameraView({ 
  selectedPose, 
  settings, 
  onScoreUpdate, 
  onPhotoCapture 
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [isStable, setIsStable] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // TODO: Mock pose detection - replace with MediaPipe implementation
  const mockPoseScore = useCallback(() => {
    if (!selectedPose) return 0;
    // Simulate fluctuating pose similarity score
    const baseScore = 65 + Math.random() * 25;
    const score = Math.min(100, Math.max(0, baseScore + (Math.random() - 0.5) * 10));
    return Math.round(score);
  }, [selectedPose]);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: settings.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Camera access failed:', error);
      setCameraError('无法访问摄像头 / Camera access failed');
    }
  }, [settings.facingMode]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      onPhotoCapture(imageData);
      console.log('Photo captured successfully');
    }
  }, [onPhotoCapture]);

  // Auto-shutter logic
  useEffect(() => {
    if (!settings.autoShutter || !selectedPose) return;
    
    const interval = setInterval(() => {
      const score = mockPoseScore();
      setCurrentScore(score);
      
      const stable = score >= settings.threshold;
      setIsStable(stable);
      onScoreUpdate(score, stable);
      
      if (stable && isStreaming) {
        setCountdown(prev => {
          if (prev === 0) {
            return settings.stableFrames;
          } else if (prev === 1) {
            capturePhoto();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setCountdown(0);
      }
    }, 100); // 10 FPS mock detection
    
    return () => clearInterval(interval);
  }, [settings, selectedPose, mockPoseScore, onScoreUpdate, capturePhoto, isStreaming]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const switchCamera = () => {
    stopCamera();
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  if (cameraError) {
    return (
      <div className="flex-1 bg-camera-black flex items-center justify-center">
        <Card className="p-8 text-center">
          <CameraOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">摄像头访问失败</p>
          <p className="text-sm text-muted-foreground mb-4">{cameraError}</p>
          <Button onClick={startCamera} data-testid="button-retry-camera">
            <Camera className="w-4 h-4 mr-2" />
            重试 / Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-camera-black overflow-hidden">
      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        data-testid="video-camera-stream"
      />
      
      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {/* Rule of thirds grid */}
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full border border-overlay-white/20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-overlay-white/10" />
            ))}
          </div>
        </div>
        
        {/* Pose Skeleton Overlay - Mock */}
        {selectedPose && isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-48">
              {/* Mock skeleton points */}
              <div className="absolute top-4 left-1/2 w-3 h-3 bg-pose-green rounded-full transform -translate-x-1/2" />
              <div className="absolute top-12 left-1/2 w-2 h-2 bg-pose-green rounded-full transform -translate-x-1/2" />
              <div className="absolute top-12 left-8 w-2 h-2 bg-pose-green rounded-full" />
              <div className="absolute top-12 right-8 w-2 h-2 bg-pose-green rounded-full" />
              <div className="absolute top-20 left-6 w-2 h-2 bg-pose-green rounded-full" />
              <div className="absolute top-20 right-6 w-2 h-2 bg-pose-green rounded-full" />
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="50%" y1="16px" x2="50%" y2="48px" stroke="#16a34a" strokeWidth="2" opacity="0.8" />
                <line x1="50%" y1="48px" x2="32px" y2="48px" stroke="#16a34a" strokeWidth="2" opacity="0.8" />
                <line x1="50%" y1="48px" x2="96px" y2="48px" stroke="#16a34a" strokeWidth="2" opacity="0.8" />
                <line x1="32px" y1="48px" x2="24px" y2="80px" stroke="#16a34a" strokeWidth="2" opacity="0.8" />
                <line x1="96px" y1="48px" x2="104px" y2="80px" stroke="#16a34a" strokeWidth="2" opacity="0.8" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Score Display */}
        {selectedPose && (
          <div className="absolute top-4 right-4">
            <Card className="bg-black/50 backdrop-blur-sm border-overlay-white/20 p-3">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  currentScore >= settings.threshold ? 'text-pose-green' : 'text-overlay-white'
                }`} data-testid="text-pose-score">
                  {currentScore}%
                </div>
                <div className="w-20 h-2 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      currentScore >= settings.threshold ? 'bg-pose-green' : 'bg-progress-blue'
                    }`}
                    style={{ width: `${currentScore}%` }}
                  />
                </div>
                {countdown > 0 && (
                  <div className="mt-2 text-lg font-bold text-pose-green animate-pulse" data-testid="text-countdown">
                    {Math.ceil(countdown / 10)}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
        
        {/* Pose Name */}
        {selectedPose && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-overlay-white border-overlay-white/20" data-testid="badge-pose-name">
              <Target className="w-3 h-3 mr-1" />
              {selectedPose.name.split(' / ')[0]}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Camera Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-overlay-white/20"
            onClick={switchCamera}
            data-testid="button-switch-camera"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          {!isStreaming ? (
            <Button 
              onClick={startCamera}
              size="lg"
              className="bg-pose-green hover:bg-pose-green/90 text-white min-w-32"
              data-testid="button-start-camera"
            >
              <Camera className="w-5 h-5 mr-2" />
              开始拍摄
            </Button>
          ) : (
            <Button 
              onClick={capturePhoto}
              size="lg" 
              className="bg-white hover:bg-white/90 text-black min-w-32"
              data-testid="button-capture-photo"
            >
              📸 拍照
            </Button>
          )}
          
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-overlay-white/20"
            data-testid="button-camera-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
