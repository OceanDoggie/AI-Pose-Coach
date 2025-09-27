import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { POSE_TEMPLATES, POSE_CATEGORIES } from '@/data/poses';
import type { PoseTemplate } from '@shared/schema';

interface PoseLibraryProps {
  selectedPose: PoseTemplate | null;
  onPoseSelect: (pose: PoseTemplate) => void;
  onClose: () => void;
}

export default function PoseLibrary({ selectedPose, onPoseSelect, onClose }: PoseLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPoses = POSE_TEMPLATES.filter(pose => {
    const matchesCategory = selectedCategory === 'all' || pose.tags.includes(selectedCategory);
    const matchesSearch = searchQuery === '' || 
      pose.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pose.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">姿势库 / Pose Library</h2>
            <p className="text-sm text-muted-foreground mt-1">
              选择一个姿势开始拍摄 / Choose a pose to start shooting
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} data-testid="button-close-library">
            ✕
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索姿势... / Search poses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-poses"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {POSE_CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
              data-testid={`button-category-${category.id}`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Pose Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoses.map(pose => (
            <Card 
              key={pose.id}
              className={`cursor-pointer transition-all hover-elevate ${
                selectedPose?.id === pose.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => onPoseSelect(pose)}
              data-testid={`card-pose-${pose.id}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base line-clamp-2">
                  {pose.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Mock pose preview */}
                <div className="w-full h-32 bg-muted rounded-md mb-3 flex items-center justify-center">
                  <div className="relative w-16 h-24">
                    {/* Simplified stick figure representation */}
                    <div className="absolute top-2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                    <div className="absolute top-6 left-1/2 w-1 h-8 bg-primary transform -translate-x-1/2" />
                    <div className="absolute top-8 left-4 w-1 h-6 bg-primary transform rotate-12" />
                    <div className="absolute top-8 right-4 w-1 h-6 bg-primary transform -rotate-12" />
                    <div className="absolute bottom-4 left-4 w-1 h-8 bg-primary" />
                    <div className="absolute bottom-4 right-4 w-1 h-8 bg-primary" />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {pose.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Instructions preview */}
                {pose.sequence && pose.sequence.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <p className="line-clamp-2">{pose.sequence[0]}</p>
                  </div>
                )}
                
                {/* Selection indicator */}
                {selectedPose?.id === pose.id && (
                  <div className="mt-3 flex items-center text-primary text-sm font-medium">
                    <Target className="w-3 h-3 mr-1" />
                    已选择 / Selected
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPoses.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">没有找到姿势</p>
            <p className="text-sm text-muted-foreground">No poses found matching your criteria</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
