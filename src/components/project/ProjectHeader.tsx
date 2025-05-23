"use client";

import { ProgressBar } from '@/components/ui/progress-bar';
import { Badge } from '@/components/ui/badge';

interface ProjectHeaderProps {
  title: string;
  lastUpdated: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived' | 'On Hold';
  progress: number;
}

export function ProjectHeader({ title, lastUpdated, status, progress }: ProjectHeaderProps) {
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };

  const getStatusColor = (status: string): string => {
    const colors = {
      'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'In Progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      'On Hold': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[status as keyof typeof colors] || colors.Planning;
  };

  const getProgressVariant = (progress: number) => {
    if (progress >= 80) return "success";
    if (progress >= 60) return "warning";
    if (progress >= 40) return "default";
    return "default";
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Last updated {formatTimeAgo(lastUpdated)}
              </p>
            </div>
            <Badge className={`px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(status)}`}>
              {status}
            </Badge>
          </div>
          
          {/* Progress Section */}
          <div className="max-w-md">
            <ProgressBar 
              value={progress} 
              variant={getProgressVariant(progress)}
              size="lg"
              className="animate-fadeInUp"
            />
          </div>
        </div>
        
        {/* Phoenix Animation Container */}
        <div className="hidden lg:flex items-center justify-center w-32 h-32">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 rounded-full animate-floating opacity-80 blur-sm"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-bounce">🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 