"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Building2, FileText, Target } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  description: string;
  company: {
    _id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  projectType: string;
  researchObjectives: string[];
}

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-10">
      {/* Project Overview Card */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-6 h-6" />
            Project Overview
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
            Key information and timeline
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white">
                  Project Name
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  {project.title}
                </p>
              </div>
              
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white">
                  Project Code
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2 font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg w-fit font-semibold">
                  {project.projectId}
                </p>
              </div>
              
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Start Date
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  {project.startDate}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Client
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  {project.company.name}
                </p>
              </div>
              
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white">
                  Project Type
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  {project.projectType}
                </p>
              </div>
              
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  End Date
                </label>
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  {project.endDate}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Objectives Card */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <Target className="w-6 h-6" />
            Research Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.researchObjectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {objective}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-base text-blue-800 dark:text-blue-200 italic leading-relaxed">
              Research on how professionals adapt to remote work environments
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 