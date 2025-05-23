'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReviewObjectives } from '../research/steps/review-objectives'
import { ConfigureGuide } from '../research/steps/configure-guide'
import { GeneratedGuide } from '../research/steps/generated-guide'

interface Project {
  _id: string;
  title: string;
  projectId: string;
  researchObjectives: string[];
}

interface ProjectDiscussionGuidesProps {
  project: Project;
}

interface StepProps {
  isActive: boolean
  isCompleted: boolean
  stepNumber: number
  title: string
}

const Step: React.FC<StepProps> = ({ isActive, isCompleted, stepNumber, title }) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300",
          isActive 
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30" 
            : isCompleted 
              ? "bg-blue-600 text-white" 
              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          stepNumber
        )}
      </div>
      <span className={cn(
        "ml-3 text-sm font-medium hidden sm:block",
        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
      )}>
        {title}
      </span>
    </div>
  )
}

const StepConnector: React.FC<{ isCompleted: boolean }> = ({ isCompleted }) => (
  <div className="flex-1 mx-4">
    <div
      className={cn(
        "h-0.5 transition-all duration-300",
        isCompleted ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      )}
    />
  </div>
)

interface StepData {
  objectives?: string[]
  additionalContext?: string
  generatedGuide?: string
}

interface SavedGuide {
  id: string
  title: string
  createdAt: string
  status: 'active' | 'draft' | 'archived'
  projectId: string
}

export const ProjectDiscussionGuides: React.FC<ProjectDiscussionGuidesProps> = ({ project }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [discussionGuideData, setDiscussionGuideData] = useState<StepData>({
    objectives: project.researchObjectives || [],
    additionalContext: '',
    generatedGuide: ''
  })

  // Mock saved guides for this project
  const [savedGuides] = useState<SavedGuide[]>([
    {
      id: '1',
      title: `${project.title} - Discussion Guide v1`,
      createdAt: '2024-01-15',
      status: 'active',
      projectId: project.projectId
    }
  ])

  const steps = [
    { number: 1, title: 'Review Research Objectives' },
    { number: 2, title: 'Configure Discussion Guide' },
    { number: 3, title: 'Generated Discussion Guide' }
  ]

  const handleStepComplete = (stepNumber: number, data?: StepData) => {
    setCompletedSteps(prev => [...prev.filter(s => s !== stepNumber), stepNumber])
    if (data) {
      setDiscussionGuideData(prev => ({ ...prev, ...data }))
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ReviewObjectives
            objectives={project.researchObjectives}
            onComplete={(data) => {
              handleStepComplete(1, { objectives: data.objectives })
              handleNext()
            }}
          />
        )
      case 2:
        return (
          <ConfigureGuide
            onComplete={(data) => {
              handleStepComplete(2, { additionalContext: data.additionalContext })
              handleNext()
            }}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <GeneratedGuide
            data={{
              objectives: discussionGuideData.objectives || [],
              additionalContext: discussionGuideData.additionalContext || '',
              generatedGuide: discussionGuideData.generatedGuide || ''
            }}
            onBack={handleBack}
            onSave={(guide) => {
              handleStepComplete(3, { generatedGuide: guide })
              // Here you would implement save logic specific to this project
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Discussion Guide(s)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create comprehensive discussion guides for {project.title} using our step-by-step wizard
        </p>
      </div>

      {/* Step Indicator */}
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <Step
                  stepNumber={step.number}
                  title={step.title}
                  isActive={currentStep === step.number}
                  isCompleted={completedSteps.includes(step.number)}
                />
                {index < steps.length - 1 && (
                  <StepConnector isCompleted={completedSteps.includes(step.number + 1)} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="animate-in fade-in-50 duration-500">
        {renderCurrentStep()}
      </div>

      {/* Saved Guides Section for this Project */}
      {savedGuides.length > 0 && (
        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-white/20 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Saved Discussion Guides for {project.title}
            </h3>
            <div className="space-y-3">
              {savedGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-700/60 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {guide.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Created {new Date(guide.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                      View
                    </button>
                    <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 