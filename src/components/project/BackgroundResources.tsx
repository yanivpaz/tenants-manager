"use client";

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  FileText,
  ExternalLink,
  Eye,
  Trash2,
  Plus,
  File,
  BookOpen,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface ProjectResource {
  _id: string;
  name: string;
  type: 'pdf' | 'external_link' | 'study' | 'document';
  uploadedAt: string;
  size?: string;
  description?: string;
  url?: string;
  icon?: React.ReactNode;
  actionLabel: string;
}

export function BackgroundResources() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Mock data for resources - this would come from props or API
  const resources: ProjectResource[] = [
    {
      _id: '1',
      name: 'Remote Work Industry Report 2025',
      type: 'pdf',
      uploadedAt: 'May 3, 2025',
      size: '2.4 MB',
      description: 'Industry insights and trends',
      actionLabel: 'View'
    },
    {
      _id: '2',
      name: 'Remote Work Trends Survey',
      type: 'external_link',
      uploadedAt: 'May 8, 2025',
      url: 'https://example.com/survey',
      description: 'External Link',
      actionLabel: 'Open Link'
    },
    {
      _id: '3',
      name: 'Client Background Information',
      type: 'document',
      uploadedAt: 'May 2, 2025',
      size: '1.8 MB',
      description: 'Client context and requirements',
      actionLabel: 'View'
    },
    {
      _id: '4',
      name: 'Hybrid Work Pilot Study',
      type: 'study',
      uploadedAt: 'January 2025',
      description: 'Previous Study',
      actionLabel: 'View Study'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-600" />;
      case 'external_link':
        return <ExternalLink className="w-6 h-6 text-blue-600" />;
      case 'study':
        return <BookOpen className="w-6 h-6 text-purple-600" />;
      default:
        return <File className="w-6 h-6 text-gray-600" />;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'external_link':
        return <ExternalLink className="w-4 h-4" />;
      case 'study':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    console.log('Uploading files:', Array.from(files));
    // TODO: Implement actual file upload
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png,.gif,.mp4,.avi';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleFiles(target.files);
      }
    };
    input.click();
  };

  const handleResourceAction = (resource: ProjectResource) => {
    console.log(`${resource.actionLabel} resource:`, resource.name);
    if (resource.type === 'external_link' && resource.url) {
      window.open(resource.url, '_blank');
    }
    // TODO: Implement other actions
  };

  const handleDeleteResource = (resourceId: string) => {
    console.log('Delete resource:', resourceId);
    // TODO: Implement delete
  };

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Resources
          </h1>
        </div>
        <Button 
          onClick={handleFileUpload}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      {/* Project Resources Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            Project Resources
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Upload and manage existing documents supplied by the client or from other sources to help add context to your research project. 
            These resources can provide valuable background information, requirements, and reference materials for your analysis.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.length > 0 ? (
            <div className="space-y-3">
              {resources.map((resource) => (
                <div 
                  key={resource._id} 
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600/50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600/50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getFileIcon(resource.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-base mb-1 truncate">
                        {resource.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Added on {resource.uploadedAt}
                        </span>
                        {resource.size && (
                          <span className="text-gray-500">• {resource.size}</span>
                        )}
                        {resource.description && (
                          <Badge variant="outline" className="text-xs">
                            {resource.description}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResourceAction(resource)}
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 min-w-[100px]"
                    >
                      {getActionIcon(resource.type)}
                      <span className="ml-2">{resource.actionLabel}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteResource(resource._id)}
                      className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No resources uploaded yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upload documents, links, or studies to get started
              </p>
              <Button onClick={handleFileUpload}>
                <Plus className="w-4 h-4 mr-2" />
                Upload First Resource
              </Button>
            </div>
          )}

          {/* Drag and Drop Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50/50 dark:bg-gray-700/20'
            }`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="mb-4">
                <Upload className={`w-12 h-12 mx-auto ${dragActive ? 'text-blue-600' : 'text-gray-400'} transition-colors`} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dragActive ? 'Drop files here' : 'Drag and drop files here, or click to browse'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Support for PDF, DOC, images, videos and more
              </p>
              <Button 
                variant="outline" 
                onClick={handleFileUpload}
                className="hover:bg-white dark:hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Resource
              </Button>
            </div>

            {/* Upload Progress */}
            {uploadProgress !== null && (
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {uploadProgress === 100 ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-600 animate-pulse" />
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    {uploadProgress === 100 ? 'Upload Complete!' : 'Uploading...'}
                  </p>
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {uploadProgress}% complete
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 