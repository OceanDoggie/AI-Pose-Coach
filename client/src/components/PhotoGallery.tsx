import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Download, Share2, Trash2, Calendar, Target } from 'lucide-react';

interface PhotoSession {
  id: string;
  timestamp: number;
  poseId: string;
  poseName: string;
  score: number;
  imageData: string;
}

interface PhotoGalleryProps {
  photos: PhotoSession[];
  onDeletePhoto: (id: string) => void;
  onRetakePhoto: (poseId: string) => void;
}

export default function PhotoGallery({ photos, onDeletePhoto, onRetakePhoto }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoSession | null>(null);
  
  const downloadPhoto = (photo: PhotoSession) => {
    const link = document.createElement('a');
    link.href = photo.imageData;
    link.download = `pose-coach-${photo.poseName.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Photo downloaded:', photo.id);
  };

  const sharePhoto = async (photo: PhotoSession) => {
    if (navigator.share) {
      try {
        // Convert data URL to blob for sharing
        const response = await fetch(photo.imageData);
        const blob = await response.blob();
        const file = new File([blob], `pose-coach-${photo.id}.jpg`, { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'AI Pose Coach Photo',
          text: `摆出了 ${photo.poseName} 姿势，相似度 ${photo.score}%！`,
          files: [file]
        });
        console.log('Photo shared successfully');
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy image data to clipboard
      try {
        await navigator.clipboard.writeText(`AI Pose Coach - ${photo.poseName} (${photo.score}%)`);
        console.log('Photo info copied to clipboard');
      } catch (error) {
        console.log('Clipboard access failed:', error);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-pose-green text-white';
    if (score >= 60) return 'bg-warning-amber text-white';
    return 'bg-destructive text-white';
  };

  if (photos.length === 0) {
    return (
      <div className="p-8 text-center">
        <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">还没有照片 / No Photos Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          开始拍摄来创建你的姿势作品集
        </p>
        <p className="text-xs text-muted-foreground">
          Start shooting to create your pose portfolio
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-1">照片相册 / Photo Gallery</h2>
        <p className="text-sm text-muted-foreground">
          {photos.length} 张照片 / {photos.length} photos
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(photo => (
            <Card key={photo.id} className="overflow-hidden hover-elevate">
              <div className="relative">
                {/* Photo thumbnail */}
                <div 
                  className="aspect-[3/4] bg-muted cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.imageData}
                    alt={photo.poseName}
                    className="w-full h-full object-cover"
                    data-testid={`img-photo-${photo.id}`}
                  />
                </div>
                
                {/* Score badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={getScoreColor(photo.score)}>
                    {photo.score}%
                  </Badge>
                </div>
                
                {/* Quick actions */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      sharePhoto(photo);
                    }}
                    data-testid={`button-share-${photo.id}`}
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPhoto(photo);
                    }}
                    data-testid={`button-download-${photo.id}`}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {photo.poseName.split(' / ')[0]}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(photo.timestamp)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRetakePhoto(photo.poseId)}
                    data-testid={`button-retake-${photo.id}`}
                  >
                    <Target className="w-3 h-3 mr-1" />
                    重拍
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeletePhoto(photo.id)}
                    className="text-destructive hover:text-destructive"
                    data-testid={`button-delete-${photo.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {/* Photo Detail Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPhoto && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedPhoto.poseName}</span>
                  <Badge className={getScoreColor(selectedPhoto.score)}>
                    {selectedPhoto.score}% 相似度
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Full size image */}
                <div className="relative">
                  <img 
                    src={selectedPhoto.imageData}
                    alt={selectedPhoto.poseName}
                    className="w-full h-auto rounded-md"
                    data-testid="img-photo-detail"
                  />
                </div>
                
                {/* Photo info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">拍摄时间:</span>
                    <p className="font-medium">{new Date(selectedPhoto.timestamp).toLocaleString('zh-CN')}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">姿势相似度:</span>
                    <p className="font-medium">{selectedPhoto.score}%</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="flex-1"
                    data-testid="button-download-detail"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载照片
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => sharePhoto(selectedPhoto)}
                    className="flex-1"
                    data-testid="button-share-detail"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    分享照片
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      onRetakePhoto(selectedPhoto.poseId);
                      setSelectedPhoto(null);
                    }}
                    data-testid="button-retake-detail"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    重新拍摄
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
