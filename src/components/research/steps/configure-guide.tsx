'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react'

interface ConfigureGuideProps {
  onComplete: (data: { additionalContext: string }) => void
  onBack: () => void
}

export const ConfigureGuide: React.FC<ConfigureGuideProps> = ({ onComplete, onBack }) => {
  const [additionalContext, setAdditionalContext] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsGenerating(false)
    onComplete({ additionalContext })
  }

  return (
    <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Step 2: Configure Discussion Guide
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Provide additional context for your discussion guide generation.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="context" className="text-sm font-medium text-gray-900 dark:text-white">
              Additional Context (Optional)
            </Label>
            <Textarea
              id="context"
              placeholder="Add any specific areas you want to focus on or additional context for the guide generation..."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              className="min-h-[120px] backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-colors resize-none"
            />
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Your discussion guide will be generated based on the research objectives from your Statement of Work. 
              Add any additional context or specific areas of focus above.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 min-w-[180px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Guide...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Discussion Guide
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 