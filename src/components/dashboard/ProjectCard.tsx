import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, Building2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived' | 'On Hold';
  company: {
    _id: string;
    name: string;
  };
  updatedAt: string;
  createdBy: string;
}

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  'On Hold': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `Updated ${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `Updated ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `Updated ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `Updated ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Updated just now';
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project._id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group-hover:-translate-y-1">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {project.projectId}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{project.company.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(project.updatedAt)}</span>
              </div>
            </div>
          </div>
          
          <Badge className={`ml-4 ${statusColors[project.status]} border-0`}>
            {project.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
} 