"use client";

import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  status: string;
  company: {
    _id: string;
    name: string;
  };
}

interface ProjectBreadcrumbProps {
  project: Project;
}

export function ProjectBreadcrumb({ project }: ProjectBreadcrumbProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 text-base">
          <Link 
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Home
          </Link>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
          
          <Link 
            href={`/dashboard/companies/${project.company._id}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
          >
            {project.company.name}
          </Link>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
          
          <span className="text-gray-900 dark:text-white font-bold text-lg">
            {project.title}
          </span>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
          
          <span className="text-gray-600 dark:text-gray-400 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md font-semibold">
            {project.projectId}
          </span>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
          
          <span className={`px-3 py-2 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const colors = {
    'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'In Progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    'On Hold': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };
  return colors[status as keyof typeof colors] || colors.Planning;
} 