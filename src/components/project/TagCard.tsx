"use client";

import { Sparkles, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Tag } from './TagManager';

interface TagCardProps {
  tag: Tag;
  onClick: () => void;
}

export function TagCard({ tag, onClick }: TagCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {tag.aiGenerated && (
              <div className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {tag.name}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu click
            }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Count</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{tag.count}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
              <Badge
                variant={tag.status === 'Applied' ? 'default' : 'secondary'}
                className={`text-xs ${
                  tag.status === 'Applied' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                }`}
              >
                {tag.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 