'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Edit, Calendar, FileText } from 'lucide-react'

interface SavedGuide {
  id: string
  title: string
  createdAt: string
  status: 'active' | 'draft' | 'archived'
  type: string
}

export const SavedGuides: React.FC = () => {
  const savedGuides: SavedGuide[] = [
    {
      id: '1',
      title: 'Remote Work Research Discussion Guide',
      createdAt: '2024-01-15',
      status: 'active',
      type: 'User Experience'
    },
    {
      id: '2', 
      title: 'Customer Feedback Interview Guide',
      createdAt: '2024-01-10',
      status: 'draft',
      type: 'Product Research'
    },
    {
      id: '3',
      title: 'Employee Satisfaction Study Guide',
      createdAt: '2024-01-05',
      status: 'archived',
      type: 'Internal Research'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700'
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700'
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700'
    }
  }

  return (
    <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            My Saved Discussion Guides
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {savedGuides.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No saved discussion guides yet.</p>
            <p className="text-sm">Complete the wizard above to create your first guide.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedGuides.map((guide) => (
              <div
                key={guide.id}
                className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {guide.title}
                    </h3>
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(guide.status)}
                    >
                      {guide.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>•</span>
                      <span>{guide.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 dark:text-blue-400 dark:border-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300 dark:text-purple-400 dark:border-purple-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 