"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Settings } from 'lucide-react';

interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Project {
  _id: string;
  teamMembers: TeamMember[];
}

interface ProjectTeamProps {
  project: Project;
}

const roleColors = {
  'Lead Researcher': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'UX Researcher': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'Data Analyst': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'Content Strategist': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  'Owner': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'Editor': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
  'Viewer': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
};

export function ProjectTeam({ project }: ProjectTeamProps) {
  const getRoleColor = (role: string): string => {
    return roleColors[role as keyof typeof roleColors] || roleColors.Viewer;
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" />
            Project Team
          </div>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <Settings className="w-5 h-5" />
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Team members working on this project
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {project.teamMembers.map((member) => (
          <div key={member._id} className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              {member.avatar || getInitials(member.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-base truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {member.email}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(member.role)} flex-shrink-0`}>
                  {member.role === 'Lead Researcher' ? 'Owner' : 
                   member.role === 'UX Researcher' ? 'Editor' :
                   member.role === 'Data Analyst' ? 'Editor' : 'Viewer'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" className="w-full text-sm font-semibold">
            Manage Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 