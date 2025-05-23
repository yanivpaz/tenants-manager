"use client";

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  company: {
    _id: string;
    name: string;
  };
}

interface NavigationArrowsProps {
  project: Project;
}

export function NavigationArrows({ project }: NavigationArrowsProps) {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.push(`/dashboard/companies/${project.company._id}`);
  };

  return (
    <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleNavigateBack}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {project.company.name}
        </Button>
      </div>
    </div>
  );
} 