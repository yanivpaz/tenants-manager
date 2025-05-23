'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReviewObjectives } from './steps/review-objectives'
import { ConfigureGuide } from './steps/configure-guide'
import { GeneratedGuide } from './steps/generated-guide'
import { SavedGuides } from './saved-guides'

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

export const ResearchDesign: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [discussionGuideData, setDiscussionGuideData] = useState<StepData>({
    objectives: [],
    additionalContext: '',
    generatedGuide: ''
  })

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
              // Could implement save logic here
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Research Design
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create comprehensive discussion guides for your research projects with our step-by-step wizard
          </p>
        </div>

        {/* Step Indicator */}
        <Card className="backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
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

        {/* Saved Guides Section - Only show after completing all steps */}
        {completedSteps.length === 3 && (
          <div className="animate-in fade-in-50 duration-700 delay-300">
            <SavedGuides />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>Built with ❤️ by <span className="font-semibold text-blue-600 dark:text-blue-400">Yuval Avidani</span></p>
          <p className="italic">&quot;Fly High With YUV.AI&quot;</p>
        </div>
      </div>
    </div>
  )
} 