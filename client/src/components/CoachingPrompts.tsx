import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Camera, Volume2, VolumeX, RotateCw } from 'lucide-react';
import type { PoseTemplate, PoseScore, CameraSettings } from '@shared/schema';

interface CoachingPromptsProps {
  selectedPose: PoseTemplate | null;
  currentScore: PoseScore | null;
  settings: CameraSettings;
  onSettingsChange: (settings: Partial<CameraSettings>) => void;
}

export default function CoachingPrompts({ 
  selectedPose, 
  currentScore, 
  settings, 
  onSettingsChange 
}: CoachingPromptsProps) {
  // TODO: Remove mock functionality - replace with real coaching logic
  const mockAdvice = {
    model: [
      settings.language === 'zh' ? '左手再抬高一点' : 'Raise left hand higher',
      settings.language === 'zh' ? '眼睛看镜头上方' : 'Look above camera lens'
    ],
    photographer: [
      settings.language === 'zh' ? '机位稍微降低' : 'Lower camera position slightly',
      settings.language === 'zh' ? '让右侧光线更柔和' : 'Soften right side lighting'
    ]
  };

  const advice = currentScore?.advice || mockAdvice;
  const score = currentScore?.score || 0;
  
  const getScoreColor = (score: number) => {
    if (score >= settings.threshold) return 'text-pose-green';
    if (score >= 60) return 'text-warning-amber';
    return 'text-destructive';
  };

  const getScoreMessage = (score: number) => {
    if (settings.language === 'zh') {
      if (score >= settings.threshold) return '姿势完美！';
      if (score >= 70) return '接近完美';
      if (score >= 50) return '需要调整';
      return '请重新摆姿势';
    } else {
      if (score >= settings.threshold) return 'Perfect pose!';
      if (score >= 70) return 'Almost there';
      if (score >= 50) return 'Needs adjustment';
      return 'Please reposition';
    }
  };

  if (!selectedPose) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <Card className="text-center">
          <CardContent className="p-6">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {settings.language === 'zh' ? '选择一个姿势开始' : 'Select a pose to start'}
            </p>
            <p className="text-sm text-muted-foreground">
              {settings.language === 'zh' 
                ? '从姿势库中选择一个姿势，开始AI拍照指导' 
                : 'Choose a pose from the library to begin AI coaching'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Current Pose Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {selectedPose.name.split(' / ')[settings.language === 'zh' ? 0 : 1] || selectedPose.name}
            </CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {settings.language === 'zh' ? '当前姿势' : 'Current Pose'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Score Display */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {settings.language === 'zh' ? '相似度:' : 'Similarity:'}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${getScoreColor(score)}`} data-testid="text-coaching-score">
                  {score}%
                </span>
                <Badge variant={score >= settings.threshold ? "default" : "secondary"}>
                  {getScoreMessage(score)}
                </Badge>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  score >= settings.threshold ? 'bg-pose-green' : 'bg-progress-blue'
                }`}
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
            
            {/* Pose Instructions */}
            {selectedPose.sequence && selectedPose.sequence.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  {settings.language === 'zh' ? '步骤指引:' : 'Instructions:'}
                </h4>
                <ul className="space-y-1">
                  {selectedPose.sequence.map((step, index) => {
                    const stepText = step.split(' / ')[settings.language === 'zh' ? 0 : 1] || step;
                    return (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        {stepText}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Model Coaching */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="w-4 h-4" />
            {settings.language === 'zh' ? '模特指导' : 'Model Guidance'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {advice.model.map((tip, index) => (
              <li key={index} className="text-sm p-2 bg-pink-50 dark:bg-pink-950/20 rounded-md border border-pink-200 dark:border-pink-800">
                <span className="font-medium text-pink-800 dark:text-pink-200">•</span>
                <span className="ml-2 text-pink-700 dark:text-pink-300">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Photographer Coaching */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="w-4 h-4" />
            {settings.language === 'zh' ? '摄影师指导' : 'Photographer Guidance'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {advice.photographer.map((tip, index) => (
              <li key={index} className="text-sm p-2 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800">
                <span className="font-medium text-blue-800 dark:text-blue-200">•</span>
                <span className="ml-2 text-blue-700 dark:text-blue-300">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Camera Hints */}
      {selectedPose.cameraHint && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <RotateCw className="w-4 h-4" />
              {settings.language === 'zh' ? '拍摄建议' : 'Camera Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {selectedPose.cameraHint.framing && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    {settings.language === 'zh' ? '构图:' : 'Framing:'}
                  </span>
                  <p className="mt-1">
                    {selectedPose.cameraHint.framing.split(' / ')[settings.language === 'zh' ? 0 : 1] || selectedPose.cameraHint.framing}
                  </p>
                </div>
              )}
              {selectedPose.cameraHint.distance && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    {settings.language === 'zh' ? '距离:' : 'Distance:'}
                  </span>
                  <p className="mt-1">
                    {selectedPose.cameraHint.distance.split(' / ')[settings.language === 'zh' ? 0 : 1] || selectedPose.cameraHint.distance}
                  </p>
                </div>
              )}
              {selectedPose.cameraHint.height && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    {settings.language === 'zh' ? '高度:' : 'Height:'}
                  </span>
                  <p className="mt-1">
                    {selectedPose.cameraHint.height.split(' / ')[settings.language === 'zh' ? 0 : 1] || selectedPose.cameraHint.height}
                  </p>
                </div>
              )}
              {selectedPose.cameraHint.light && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    {settings.language === 'zh' ? '光线:' : 'Lighting:'}
                  </span>
                  <p className="mt-1">
                    {selectedPose.cameraHint.light.split(' / ')[settings.language === 'zh' ? 0 : 1] || selectedPose.cameraHint.light}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {settings.language === 'zh' ? '设置' : 'Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {settings.language === 'zh' ? '自动快门' : 'Auto Shutter'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSettingsChange({ autoShutter: !settings.autoShutter })}
                data-testid="button-toggle-auto-shutter"
              >
                {settings.autoShutter ? '开启' : '关闭'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {settings.language === 'zh' ? '语言' : 'Language'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSettingsChange({ language: settings.language === 'zh' ? 'en' : 'zh' })}
                data-testid="button-toggle-language"
              >
                {settings.language === 'zh' ? '中文' : 'English'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {settings.language === 'zh' ? '阈值' : 'Threshold'}
              </span>
              <span className="text-sm text-muted-foreground">{settings.threshold}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
