"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Plus, 
  Search,
  Download,
  Upload,
  Eye,
  FileText,
  File,
  Building2
} from 'lucide-react';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived' | 'On Hold';
  description: string;
  updatedAt: string;
  createdAt: string;
}

interface Document {
  _id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
}

interface Company {
  _id: string;
  name: string;
  description: string;
  projects: Project[];
  documents: Document[];
}

interface CompanyOverviewProps {
  companyId: string;
}

const statusColors = {
  'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  'On Hold': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function CompanyOverview({ companyId }: CompanyOverviewProps) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      // Simulated data for now - will be replaced with actual API call
      const mockCompany: Company = {
        _id: companyId,
        name: 'TechWorkspaces Inc.',
        description: 'A leading provider of workplace technology solutions focused on enhancing productivity and collaboration in hybrid work environments.',
        projects: [
          {
            _id: '1',
            title: 'Remote Work Preferences Study',
            projectId: 'P1001',
            status: 'In Progress',
            description: 'Research on how professionals adapt to remote work environments',
            updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '2',
            title: 'Remote Collaboration Tools Comparison',
            projectId: 'P1002',
            status: 'In Progress',
            description: 'Comparing different collaboration tools for remote teams',
            updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '3',
            title: 'Office Space Redesign Feedback',
            projectId: 'P1003',
            status: 'Completed',
            description: 'Gathering employee feedback on new office layouts',
            updatedAt: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '4',
            title: 'Employee Onboarding Experience',
            projectId: 'P1004',
            status: 'Completed',
            description: 'Evaluating the new employee onboarding process',
            updatedAt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 8 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: '5',
            title: 'Collaboration Tool Usability',
            projectId: 'P1005',
            status: 'In Progress',
            description: 'Evaluating user experience of new collaboration software',
            updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
        documents: [
          {
            _id: '1',
            name: 'Client Brief.pdf',
            type: 'application/pdf',
            size: 2541250,
            uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            url: '/documents/client-brief.pdf',
          },
          {
            _id: '2',
            name: 'Research Contract.docx',
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            size: 1785324,
            uploadedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
            url: '/documents/research-contract.docx',
          },
          {
            _id: '3',
            name: 'Brand Guidelines.pdf',
            type: 'application/pdf',
            size: 5245830,
            uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            url: '/documents/brand-guidelines.pdf',
          },
        ],
      };
      setCompany(mockCompany);
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]); // We want this to update only when companyId changes

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add the new file to the documents list
      const newDoc: Document = {
        _id: Date.now().toString(),
        name: files[0].name,
        type: files[0].type,
        size: files[0].size,
        uploadedAt: new Date().toISOString(),
        url: `/documents/${files[0].name}`,
      };
      
      setCompany(prev => prev ? {
        ...prev,
        documents: [newDoc, ...prev.documents]
      } : null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDownload = (doc: Document) => {
    // Simulate download
    const link = window.document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  };

  const filteredProjects = company?.projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            Company not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The company you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-6">
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {company.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
              {company.description}
            </p>
          </div>
          
          <Link href="/dashboard/projects/new">
            <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 text-white px-6 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Research projects for this client
              </p>
            </div>
            
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <Link 
                key={project._id} 
                href={`/projects/${project._id}`}
                className="block transition-transform hover:scale-105"
              >
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded font-semibold">
                      {project.projectId}
                    </span>
                    <span>Updated {formatTimeAgo(project.updatedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                No projects found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'No projects available for this company.'}
              </p>
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Client Documents
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Background documents for this client
              </p>
            </div>
            
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.mp4,.mp3,.wav,.mov,.avi"
              />
              <label htmlFor="file-upload">
                <Button 
                  asChild
                  size="sm" 
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  disabled={uploadingFile}
                >
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingFile ? 'Uploading...' : 'Upload'}
                  </span>
                </Button>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            {company.documents.map((document) => (
              <Card key={document._id} className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {document.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(document.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(document.url, '_blank')}
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {company.documents.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                No documents
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Upload documents for this client.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}