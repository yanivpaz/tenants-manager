'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface ReviewObjectivesProps {
  onComplete: (data: { objectives: string[] }) => void
  objectives?: string[]
}

export const ReviewObjectives: React.FC<ReviewObjectivesProps> = ({ onComplete, objectives }) => {
  const researchObjectives = objectives || [
    "Identify key factors influencing remote work satisfaction",
    "Understand technology needs for effective remote collaboration", 
    "Discover patterns in work-life balance challenges",
    "Develop recommendations for hybrid work policies",
    "Explore how different personality types adapt to remote work environments",
    "Evaluate the effectiveness of communication tools for remote teams",
    "Assess the impact of remote work on team cohesion and company culture"
  ]

  const handleContinue = () => {
    onComplete({ objectives: researchObjectives })
  }

  return (
    <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Step 1: Review Research Objectives
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              These objectives have been extracted from your Statement of Work to inform your discussion guide.
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-3 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Research Objectives
          </h3>
          <div className="space-y-3">
            {researchObjectives.map((objective, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-blue-100 dark:border-blue-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
              >
                <Badge 
                  variant="secondary" 
                  className="mt-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                >
                  {index + 1}
                </Badge>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6"
          >
            Continue to Guide Options
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 