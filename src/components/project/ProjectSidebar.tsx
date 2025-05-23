"use client";

import { useState } from 'react';
import { 
  Home, 
  Settings, 
  FolderOpen, 
  MessageSquare, 
  Tag,
  Users,
  BarChart3,
  Database,
  Lightbulb,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

interface Project {
  _id: string;
  title: string;
  projectId: string;
}

interface ProjectSidebarProps {
  project: Project;
  activePhase: string;
  onPhaseChange: (phase: string) => void;
}

const phases = [
  {
    id: 'phase-1',
    title: 'PHASE 1: SETUP & INPUTS',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    items: [
      { id: 'project-setup', label: 'Project Setup', icon: Settings },
      { id: 'background-resources', label: 'Background Resources', icon: FolderOpen },
      { id: 'discussion-guides', label: 'Discussion Guide(s)', icon: MessageSquare },
      { id: 'tagging', label: 'Tagging', icon: Tag },
    ]
  },
  {
    id: 'phase-2',
    title: 'PHASE 2: DATA & ANALYSIS',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    items: [
      { id: 'interviews', label: 'Interviews', icon: Users },
      { id: 'analysis', label: 'Analysis', icon: BarChart3 },
      { id: 'data-explorer', label: 'Data Explorer', icon: Database },
      { id: 'hypothesis-manager', label: 'Hypothesis Manager', icon: Lightbulb },
    ]
  },
  {
    id: 'phase-3',
    title: 'PHASE 3: OUTPUTS',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    items: [
      { id: 'insights', label: 'Insights', icon: Lightbulb },
    ]
  }
];

export function ProjectSidebar({ project, activePhase, onPhaseChange }: ProjectSidebarProps) {
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(['phase-1', 'phase-2', 'phase-3']));

  const togglePhase = (phaseId: string) => {
    const newOpenPhases = new Set(openPhases);
    if (newOpenPhases.has(phaseId)) {
      newOpenPhases.delete(phaseId);
    } else {
      newOpenPhases.add(phaseId);
    }
    setOpenPhases(newOpenPhases);
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 font-mono">
          {project.projectId}
        </p>
      </div>

      <div className="p-6 space-y-3">
        {/* Project Home */}
        <Button
          variant={activePhase === 'project-home' ? 'default' : 'ghost'}
          className={`w-full justify-start gap-3 h-12 text-base ${
            activePhase === 'project-home' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => onPhaseChange('project-home')}
        >
          <Home className="w-5 h-5" />
          Project Home
        </Button>

        {/* Phases */}
        {phases.map((phase) => (
          <div key={phase.id} className="space-y-2">
            <Collapsible 
              open={openPhases.has(phase.id)} 
              onOpenChange={() => togglePhase(phase.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-between text-sm font-bold uppercase tracking-wide h-10 px-4 rounded-lg ${phase.color} ${phase.bgColor} hover:opacity-80 transition-all`}
                >
                  {phase.title}
                  {openPhases.has(phase.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1 ml-4">
                {phase.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activePhase === item.id ? 'default' : 'ghost'}
                      className={`w-full justify-start gap-3 h-11 pl-6 text-base ${
                        activePhase === item.id 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => onPhaseChange(item.id)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
} 