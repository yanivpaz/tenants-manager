"use client";

import { useState, useEffect } from 'react';
import { ProjectSidebar } from './ProjectSidebar';
import { ProjectBreadcrumb } from './ProjectBreadcrumb';
import { ProjectHeader } from './ProjectHeader';
import { ProjectOverview } from './ProjectOverview';
import { ProjectSetup } from './ProjectSetup';
import { BackgroundResources } from './BackgroundResources';
import { ProjectTeam } from './ProjectTeam';
import { RecentActivity } from './RecentActivity';
import { NavigationArrows } from './NavigationArrows';
import { TagManager } from './TagManager';
import { ProjectDiscussionGuides } from './ProjectDiscussionGuides';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived' | 'On Hold';
  progress: number;
  description: string;
  company: {
    _id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  projectType: string;
  researchObjectives: string[];
  researchGoals: string[];
  researchQuestions: string[];
  teamMembers: Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  }>;
  statementOfWork?: {
    title: string;
    description: string;
    documents: Array<{
      _id: string;
      filename: string;
      originalName: string;
      uploadedAt: string;
    }>;
  };
  recentActivity: Array<{
    _id: string;
    type: string;
    description: string;
    user: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ProjectLayoutProps {
  projectId: string;
  userId: string;
}

export function ProjectLayout({ projectId }: ProjectLayoutProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState('project-setup');

  useEffect(() => {
    fetchProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      // Enhanced mock data to match the screenshot
      const mockProject: Project = {
        _id: projectId,
        title: 'Remote Work Preferences Study',
        projectId: 'P001',
        status: 'In Progress',
        progress: 65,
        description: 'Research on how professionals adapt to remote work environments',
        company: {
          _id: '683082c7a63aa039ff56915d',
          name: 'TechWorkspaces Inc.',
        },
        startDate: 'April 15, 2025',
        endDate: 'June 30, 2025',
        projectType: 'Qualitative Research',
        researchObjectives: [
          'Identify key factors influencing remote work satisfaction',
          'Understand technology needs for effective remote collaboration',
          'Discover patterns in work-life balance challenges',
          'Develop recommendations for hybrid work policies'
        ],
        researchGoals: [
          'Identify key factors influencing remote work satisfaction',
          'Understand technology needs for effective remote collaboration',
          'Discover patterns in work-life balance challenges',
          'Develop recommendations for hybrid work policies'
        ],
        researchQuestions: [
          'How do different personality types adapt to remote work environments?',
          'What communication tools are most effective for remote teams?'
        ],
        teamMembers: [
          {
            _id: '1',
            name: 'Alex Kim',
            email: 'alex.kim@company.com',
            role: 'Lead Researcher',
            avatar: 'AK'
          },
          {
            _id: '2',
            name: 'Jamie Lee',
            email: 'jamie.lee@company.com',
            role: 'UX Researcher',
            avatar: 'JL'
          },
          {
            _id: '3',
            name: 'Michael Torres',
            email: 'michael.torres@company.com',
            role: 'Data Analyst',
            avatar: 'MT'
          },
          {
            _id: '4',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            role: 'Content Strategist',
            avatar: 'SJ'
          }
        ],
        statementOfWork: {
          title: 'Remote Work Study Agreement',
          description: 'Project scope and contractual agreement',
          documents: [
            {
              _id: '1',
              filename: 'TechWorkspaces_Remote_Work_Study_SoW.pdf',
              originalName: 'TechWorkspaces_Remote_Work_Study_SoW.pdf',
              uploadedAt: new Date('2025-04-10').toISOString(),
            }
          ]
        },
        recentActivity: [
          {
            _id: '1',
            type: 'tag',
            description: "Created tag &lsquo;productivity tools&rsquo;",
            user: 'Alex Kim',
            timestamp: '2 hours ago'
          },
          {
            _id: '2',
            type: 'transcript',
            description: "Added transcript &lsquo;Interview with Remote Manager #8&rsquo;",
            user: 'Jamie Lee',
            timestamp: 'Yesterday'
          },
          {
            _id: '3',
            type: 'insight',
            description: "Created insight &lsquo;Communication Challenges in Distributed Teams&rsquo;",
            user: 'Michael Torres',
            timestamp: '2 days ago'
          },
          {
            _id: '4',
            type: 'hypothesis',
            description: 'Proven hypothesis about flexible scheduling preferences',
            user: 'Sarah Johnson',
            timestamp: '3 days ago'
          }
        ],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      };
      
      setProject(mockProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="animate-pulse">
          <div className="h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"></div>
          <div className="flex">
            <div className="w-80 h-screen bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"></div>
            <div className="flex-1 p-8 space-y-6">
              <div className="h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded w-96"></div>
              <div className="h-64 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative">
      {/* Glass blur background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-100/20 to-purple-200/30 dark:from-gray-900/30 dark:via-blue-900/20 dark:to-purple-900/30 backdrop-blur-sm"></div>
      
      {/* Breadcrumb */}
      <div className="relative z-10">
        <ProjectBreadcrumb project={project} />
      </div>
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <ProjectSidebar 
          project={project}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />
        
        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Navigation Arrows */}
          <NavigationArrows project={project} />
          
          <div className="max-w-7xl mx-auto px-8 py-10">
            {/* Project Header */}
            <ProjectHeader 
              title={project.title}
              lastUpdated={project.updatedAt}
              status={project.status}
              progress={project.progress}
            />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
              {/* Main Content Area */}
              <div className="xl:col-span-3">
                {/* Project Setup */}
                {activePhase === 'project-setup' && (
                  <ProjectSetup project={project} />
                )}

                {/* Background Resources */}
                {activePhase === 'background-resources' && (
                  <BackgroundResources />
                )}

                {/* Project Overview */}
                {activePhase === 'project-home' && (
                  <ProjectOverview project={project} />
                )}

                {/* Tagging */}
                {activePhase === 'tagging' && (
                  <TagManager projectId={project.projectId} />
                )}

                {/* Discussion Guides */}
                {activePhase === 'discussion-guides' && (
                  <ProjectDiscussionGuides project={project} />
                )}
                
                {/* Phase-specific content will go here */}
                {activePhase !== 'project-home' && activePhase !== 'project-setup' && activePhase !== 'background-resources' && activePhase !== 'tagging' && activePhase !== 'discussion-guides' && (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 p-10 text-center shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {getPhaseTitle(activePhase)}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      This section will be implemented next.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="xl:col-span-1 space-y-8">
                <ProjectTeam project={project} />
                <RecentActivity activities={project.recentActivity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPhaseTitle(phase: string): string {
  const titles = {
    'project-setup': 'Project Setup',
    'background-resources': 'Background Resources',
    'discussion-guides': 'Discussion Guide(s)',
    'tagging': 'Tagging',
    'interviews': 'Interviews',
    'analysis': 'Analysis',
    'data-explorer': 'Data Explorer',
    'hypothesis-manager': 'Hypothesis Manager',
    'insights': 'Insights',
  };
  return titles[phase as keyof typeof titles] || 'Project Section';
}