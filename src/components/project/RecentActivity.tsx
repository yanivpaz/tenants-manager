"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Tag, 
  FileText, 
  Lightbulb, 
  TrendingUp,
  MoreHorizontal 
} from 'lucide-react';

interface Activity {
  _id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityIcons = {
  tag: Tag,
  transcript: FileText,
  insight: Lightbulb,
  hypothesis: TrendingUp,
  default: Clock,
};

const activityColors = {
  tag: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  transcript: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  insight: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  hypothesis: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  default: 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    return activityIcons[type as keyof typeof activityIcons] || activityIcons.default;
  };

  const getActivityColor = (type: string): string => {
    return activityColors[type as keyof typeof activityColors] || activityColors.default;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Recent Activity
          </div>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Latest updates on this project
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity._id} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-gray-900 dark:text-white leading-relaxed">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {activity.user}
                  </p>
                  <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" className="w-full text-sm font-semibold">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 