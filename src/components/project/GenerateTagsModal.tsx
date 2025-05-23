"use client";

import { useState } from 'react';
import { X, Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Tag } from './TagManager';

interface GenerateTagsModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (tags: Tag[]) => void;
}

export function GenerateTagsModal({ open, onClose, onGenerate }: GenerateTagsModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [researchQuestions, setResearchQuestions] = useState({
    question1: true,
    question2: true,
    question3: true,
  });
  const [additionalContext, setAdditionalContext] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tagCategories, setTagCategories] = useState({
    thematic: true,
    solution: true,
    problem: true,
    sentiment: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 500);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Generate mock tags based on selections
      const mockTags: Tag[] = [
        {
          _id: '1',
          name: 'Personal goals',
          category: { name: 'Motivations & goals', color: '#3B82F6' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
          explanation: 'This tag highlights specific events, challenges, or opportunities that motivated participants to make changes in their remote work setup or practices.',
          excerpts: [
            {
              text: 'After experiencing back pain from working at my kitchen table for two months, I finally invested in a proper desk and chair.',
              transcriptId: '1',
              transcriptTitle: 'Interview with Marketing Manager'
            }
          ]
        },
        {
          _id: '2',
          name: 'Professional aspirations',
          category: { name: 'Motivations & goals', color: '#3B82F6' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '3',
          name: 'Triggers for action',
          category: { name: 'Motivations & goals', color: '#3B82F6' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '4',
          name: 'Technical frustration',
          category: { name: 'Barriers & pain points', color: '#EF4444' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '5',
          name: 'Accessibility issues',
          category: { name: 'Barriers & pain points', color: '#EF4444' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '6',
          name: 'Misalignment with expectations',
          category: { name: 'Barriers & pain points', color: '#EF4444' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '7',
          name: 'Workarounds',
          category: { name: 'Behaviours & patterns', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '8',
          name: 'Repeated actions',
          category: { name: 'Behaviours & patterns', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '9',
          name: 'Decision-making habits',
          category: { name: 'Behaviours & patterns', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '10',
          name: 'test',
          category: { name: 'Behaviours & patterns', color: '#F59E0B' },
          count: 0,
          status: 'Pending',
          aiGenerated: false,
        },
        {
          _id: '11',
          name: 'Perceived value',
          category: { name: 'Attitudes & perceptions', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '12',
          name: 'Confidence levels',
          category: { name: 'Attitudes & perceptions', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '13',
          name: 'Brand sentiment',
          category: { name: 'Attitudes & perceptions', color: '#F59E0B' },
          count: 15,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '14',
          name: 'Ergonomic considerations',
          category: { name: 'Workspace setup', color: '#10B981' },
          count: 12,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '15',
          name: 'Home office equipment',
          category: { name: 'Workspace setup', color: '#10B981' },
          count: 18,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '16',
          name: 'Shared space challenges',
          category: { name: 'Workspace setup', color: '#10B981' },
          count: 9,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '17',
          name: 'Video conferencing',
          category: { name: 'Communication tools', color: '#8B5CF6' },
          count: 22,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '18',
          name: 'Asynchronous tools',
          category: { name: 'Communication tools', color: '#8B5CF6' },
          count: 14,
          status: 'Applied',
          aiGenerated: true,
        },
        {
          _id: '19',
          name: 'Documentation practices',
          category: { name: 'Communication tools', color: '#8B5CF6' },
          count: 11,
          status: 'Applied',
          aiGenerated: true,
        },
      ];

      setTimeout(() => {
        onGenerate(mockTags);
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    }, 3000);
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Generate Tags with AI
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isGenerating}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Generate a comprehensive tag structure for your qualitative research based on your research questions.
        </p>

        {!isGenerating ? (
          <div className="space-y-6">
            {/* Research Questions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Research Questions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All research questions will be used to generate tags. Our AI will analyze these questions to suggest relevant tags for your project.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  All research questions will be used to generate tags:
                </p>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={researchQuestions.question1}
                    onChange={(e) => setResearchQuestions(prev => ({ ...prev, question1: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Research Question 1</p>
                    <p className="text-gray-600 dark:text-gray-400">How do employees set up and maintain their remote workspaces?</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={researchQuestions.question2}
                    onChange={(e) => setResearchQuestions(prev => ({ ...prev, question2: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Research Question 2</p>
                    <p className="text-gray-600 dark:text-gray-400">What communication tools are most effective for remote teams?</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={researchQuestions.question3}
                    onChange={(e) => setResearchQuestions(prev => ({ ...prev, question3: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Research Question 3</p>
                    <p className="text-gray-600 dark:text-gray-400">How do remote workers establish boundaries between work and personal life?</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Context */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Additional Content (Optional)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add any additional information that might help the AI generate better tags.
              </p>
              <Textarea
                placeholder="For example, mention specific themes you've noticed in your data or particular aspects you want to focus on."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Advanced Settings */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 w-full justify-between">
                  <div className="flex items-center gap-2">
                    <span>Show Advanced Settings</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tag Categories</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tagCategories.thematic}
                        onChange={(e) => setTagCategories(prev => ({ ...prev, thematic: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Thematic Tags</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tagCategories.problem}
                        onChange={(e) => setTagCategories(prev => ({ ...prev, problem: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Problem Tags</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tagCategories.solution}
                        onChange={(e) => setTagCategories(prev => ({ ...prev, solution: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Solution Tags</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tagCategories.sentiment}
                        onChange={(e) => setTagCategories(prev => ({ ...prev, sentiment: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Sentiment Tags</span>
                    </label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Tags
              </Button>
            </div>
          </div>
        ) : (
          /* Generating State */
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Generating tag structure...
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Analyzing research questions to create a comprehensive tag structure.
            </p>

            <div className="max-w-md mx-auto">
              <ProgressBar value={progress} className="mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}%
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleClose}
              disabled
              className="mt-6"
            >
              Generating...
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 