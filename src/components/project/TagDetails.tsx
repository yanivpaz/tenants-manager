"use client";

import { X, Sparkles, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Tag } from './TagManager';

interface TagDetailsProps {
  tag: Tag;
  onClose: () => void;
}

export function TagDetails({ tag, onClose }: TagDetailsProps) {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                style={{ backgroundColor: tag.category.color + '20', color: tag.category.color }}
                className="px-2 py-1 text-xs font-medium"
              >
                {tag.category.name}
              </Badge>
              {tag.aiGenerated && (
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </div>
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {tag.name}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Applied</span>
              <span>Status: <span className="font-medium text-gray-900 dark:text-white">{tag.status}</span></span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* AI Explanation */}
        {tag.explanation && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              AI Explanation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tag.explanation}
            </p>
          </div>
        )}

        <Separator />

        {/* Tagged Excerpts */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Tagged Excerpts ({tag.excerpts?.length || 0})
          </h4>
          
          {tag.excerpts && tag.excerpts.length > 0 ? (
            <div className="space-y-3">
              {tag.excerpts.slice(0, 2).map((excerpt, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 italic">
                    &ldquo;{excerpt.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{excerpt.transcriptTitle}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        transcript
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {tag.excerpts.length > 2 && (
                <Button variant="outline" size="sm" className="w-full">
                  View all {tag.excerpts.length} excerpts
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No excerpts found for this tag</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 