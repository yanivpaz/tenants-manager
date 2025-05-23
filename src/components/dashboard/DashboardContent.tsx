"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Building2,
  FileText
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { CompanySection } from './CompanySection';
import { NewProjectDialog } from './NewProjectDialog';

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

interface DashboardContentProps {
  userId: string;
}

export function DashboardContent({ userId }: DashboardContentProps) {
  const { isLoaded, userId: authUserId } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('my-projects');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  // Client-side authentication check
  useEffect(() => {
    if (isLoaded && !authUserId) {
      console.log('[DashboardContent] User not authenticated, redirecting to sign-in');
      router.push('/sign-in');
      return;
    }
  }, [isLoaded, authUserId, router]);

  // Use userId for API calls in the future
  console.log('Dashboard for user:', userId);

  useEffect(() => {
    if (isLoaded && authUserId) {
      fetchProjects();
    }
  }, [isLoaded, authUserId]);

  // Don't render anything if auth is not loaded or user is not authenticated
  if (!isLoaded || !authUserId) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.myProjects || []);
        setCompanies(data.allProjects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.map(company => ({
    ...company,
    projects: company.projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(company => company.projects.length > 0);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Research Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your research projects and collaborations
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/research-design">
            <Button 
              variant="outline"
              className="border-blue-200 hover:border-blue-300 text-blue-600 hover:text-blue-700 dark:border-blue-700 dark:text-blue-400"
            >
              <FileText className="w-4 h-4 mr-2" />
              Research Design
            </Button>
          </Link>
          
          <Button 
            onClick={() => setShowNewProjectDialog(true)}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="grid w-full max-w-sm grid-cols-2 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="my-projects" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="all-projects" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                All Projects
              </TabsTrigger>
            </TabsList>
            
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="my-projects" className="mt-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  No projects found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new project.'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Button 
                      onClick={() => setShowNewProjectDialog(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all-projects" className="mt-6">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  No projects found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No projects available across all companies.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCompanies.map((company) => (
                  <CompanySection key={company._id} company={company} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer with branding */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            Built with ❤️ by{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Yuval Avidani
            </span>
            , AI Builder & Speaker
          </p>
          <p className="text-xs opacity-75">
            &ldquo;Fly High With YUV.AI&rdquo; ✨
          </p>
        </div>
      </div>

      {/* New Project Dialog */}
      <NewProjectDialog 
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
        onProjectCreated={fetchProjects}
      />
    </div>
  );
} 