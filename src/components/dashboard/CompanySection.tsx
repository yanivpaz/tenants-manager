import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Building2, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

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

interface Company {
  _id: string;
  name: string;
  projects: Project[];
}

interface CompanySectionProps {
  company: Company;
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

export function CompanySection({ company }: CompanySectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <Link 
                  href={`/dashboard/companies/${company._id}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {company.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {company.projects.length} project{company.projects.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="bg-gray-50 dark:bg-gray-900/50">
            {company.projects.map((project, index) => (
              <div key={project._id}>
                <Link href={`/projects/${project._id}`} className="block group">
                  <div className="pl-8 pr-4 py-4 hover:bg-white dark:hover:bg-gray-800 transition-colors border-l-2 border-gray-200 dark:border-gray-700 ml-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded flex-shrink-0">
                            {project.projectId}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-7">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(project.updatedAt)}</span>
                        </div>
                      </div>
                      
                      <Badge className={`ml-4 text-xs ${statusColors[project.status]} border-0 flex-shrink-0`}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
                {index < company.projects.length - 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 ml-6" />
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
} 