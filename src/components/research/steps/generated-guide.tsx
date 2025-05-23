'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Download, Edit, Save, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GeneratedGuideData {
  objectives: string[]
  additionalContext: string
  generatedGuide: string
}

interface GeneratedGuideProps {
  data: GeneratedGuideData
  onBack: () => void
  onSave: (guide: string) => void
}

export const GeneratedGuide: React.FC<GeneratedGuideProps> = ({ onBack, onSave }) => {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const discussionGuide = `Remote Work Research Discussion Guide

Introduction (5 minutes)
Thank participant for their time
Explain the purpose of the research: "We're exploring experiences with remote work to better understand challenges and opportunities"
Confirm recording consent and confidentiality
Remind there are no right or wrong answers

Background & Context (10 minutes)
Can you tell me about your current role and how long you've been working remotely?
What was the transition to remote work like for you?
How would you describe your home work environment?

Technology & Tools (15 minutes)
What tools do you use most frequently for remote collaboration?
How effective do you find these tools for your daily work?
What challenges have you encountered with technology while working remotely?
What tools or features do you wish you had access to?

Work-Life Balance (15 minutes)
Describe your typical workday routine when working remotely
How do you separate work time from personal time?
What challenges have you faced in maintaining boundaries?
What strategies have been most effective for you in maintaining work-life balance?

Team Dynamics & Culture (15 minutes)
How has remote work affected your relationships with colleagues?
What impact has remote work had on team collaboration?
How does your team maintain connection and culture while working remotely?
What team activities or practices have been most valuable for remote collaboration?

Personality & Adaptation (10 minutes)
How would you describe your work style or personality?
How well do you feel this aligns with remote work?
What aspects of your personality help or hinder your remote work experience?
How have you adapted your work style for the remote environment?

Closing (5 minutes)`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discussionGuide)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleExport = () => {
    const blob = new Blob([discussionGuide], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'remote-work-discussion-guide.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    onSave(discussionGuide)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Generated Discussion Guide
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Review and customize your discussion guide for this research project.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={cn(
                "transition-all duration-200",
                copied ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400" : ""
              )}
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-950/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-mono">
            {discussionGuide}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Options
          </Button>
          
          <Button 
            onClick={handleSave}
            className={cn(
              "shadow-lg hover:shadow-xl transition-all duration-300 px-6",
              saved 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            )}
          >
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Discussion Guide'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 