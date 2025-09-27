import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Library, Target, Image, Settings, Sun, Moon } from 'lucide-react';
import CameraView from './CameraView';
import PoseLibrary from './PoseLibrary';
import CoachingPrompts from './CoachingPrompts';
import PhotoGallery from './PhotoGallery';
import type { PoseTemplate, PoseScore, CameraSettings } from '@shared/schema';

interface PhotoSession {
  id: string;
  timestamp: number;
  poseId: string;
  poseName: string;
  score: number;
  imageData: string;
}

export default function MainLayout() {
  const [selectedPose, setSelectedPose] = useState<PoseTemplate | null>(null);
  const [currentScore, setCurrentScore] = useState<PoseScore | null>(null);
  const [photos, setPhotos] = useState<PhotoSession[]>([]);
  const [activeTab, setActiveTab] = useState('camera');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState<CameraSettings>({
    facingMode: "user",
    autoShutter: true,
    threshold: 80,
    stableFrames: 10,
    language: "zh",
    coachingMode: "simple"
  });

  const handlePoseSelect = (pose: PoseTemplate) => {
    setSelectedPose(pose);
    setActiveTab('camera');
    console.log('Pose selected:', pose.name);
  };

  const handleScoreUpdate = (score: number, stable: boolean) => {
    setCurrentScore({
      score,
      stable,
      advice: {
        model: [
          settings.language === 'zh' ? '左手再抬高一点' : 'Raise left hand higher',
          settings.language === 'zh' ? '眼睛看镜头上方' : 'Look above camera lens'
        ],
        photographer: [
          settings.language === 'zh' ? '机位稍微降低' : 'Lower camera position',
          settings.language === 'zh' ? '让右侧光线更柔和' : 'Soften right lighting'
        ]
      }
    });
  };

  const handlePhotoCapture = (imageData: string) => {
    if (!selectedPose || !currentScore) return;
    
    const newPhoto: PhotoSession = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      poseId: selectedPose.id,
      poseName: selectedPose.name,
      score: currentScore.score,
      imageData
    };
    
    setPhotos(prev => [newPhoto, ...prev]);
    setActiveTab('gallery');
    console.log('Photo captured and saved:', newPhoto.id);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    console.log('Photo deleted:', id);
  };

  const handleRetakePhoto = (poseId: string) => {
    setActiveTab('library');
    console.log('Retake photo for pose:', poseId);
  };

  const handleSettingsChange = (newSettings: Partial<CameraSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    console.log('Settings updated:', newSettings);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    console.log('Theme toggled:', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={`h-screen flex flex-col bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              AI Pose Coach
            </h1>
            <p className="text-xs text-muted-foreground">
              实时拍照指导 / Real-time Photography Guidance
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedPose && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {selectedPose.name.split(' / ')[0]}
            </Badge>
          )}
          
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-toggle-theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Mobile Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:hidden">
            <TabsTrigger value="camera" data-testid="tab-camera">
              <Camera className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="library" data-testid="tab-library">
              <Library className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="coaching" data-testid="tab-coaching">
              <Target className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">
              <Image className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 flex overflow-hidden">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:flex flex-col w-80 border-r bg-card">
              <div className="p-4 border-b">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="library">
                    <Library className="w-3 h-3" />
                  </TabsTrigger>
                  <TabsTrigger value="coaching">
                    <Target className="w-3 h-3" />
                  </TabsTrigger>
                  <TabsTrigger value="gallery">
                    <Image className="w-3 h-3" />
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="w-3 h-3" />
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <TabsContent value="library" className="h-full m-0">
                  <PoseLibrary 
                    selectedPose={selectedPose}
                    onPoseSelect={handlePoseSelect}
                    onClose={() => setActiveTab('camera')}
                  />
                </TabsContent>
                
                <TabsContent value="coaching" className="h-full m-0">
                  <CoachingPrompts 
                    selectedPose={selectedPose}
                    currentScore={currentScore}
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                  />
                </TabsContent>
                
                <TabsContent value="gallery" className="h-full m-0">
                  <PhotoGallery 
                    photos={photos}
                    onDeletePhoto={handleDeletePhoto}
                    onRetakePhoto={handleRetakePhoto}
                  />
                </TabsContent>
                
                <TabsContent value="settings" className="h-full m-0 p-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-medium mb-4">
                        {settings.language === 'zh' ? '应用设置' : 'App Settings'}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            {settings.language === 'zh' ? '深色模式' : 'Dark Mode'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleTheme}
                          >
                            {isDarkMode ? '开启' : '关闭'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </div>
            </div>

            {/* Main Camera View */}
            <div className="flex-1 flex flex-col">
              <TabsContent value="camera" className="flex-1 m-0">
                <CameraView 
                  selectedPose={selectedPose}
                  settings={settings}
                  onScoreUpdate={handleScoreUpdate}
                  onPhotoCapture={handlePhotoCapture}
                />
              </TabsContent>
              
              {/* Mobile Full-Screen Views */}
              <TabsContent value="library" className="flex-1 m-0 lg:hidden">
                <PoseLibrary 
                  selectedPose={selectedPose}
                  onPoseSelect={handlePoseSelect}
                  onClose={() => setActiveTab('camera')}
                />
              </TabsContent>
              
              <TabsContent value="coaching" className="flex-1 m-0 lg:hidden">
                <CoachingPrompts 
                  selectedPose={selectedPose}
                  currentScore={currentScore}
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </TabsContent>
              
              <TabsContent value="gallery" className="flex-1 m-0 lg:hidden">
                <PhotoGallery 
                  photos={photos}
                  onDeletePhoto={handleDeletePhoto}
                  onRetakePhoto={handleRetakePhoto}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      
      {/* Quick Action Floating Button (Mobile) */}
      {!selectedPose && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg"
            onClick={() => setActiveTab('library')}
            data-testid="button-quick-pose-select"
          >
            <Target className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
}