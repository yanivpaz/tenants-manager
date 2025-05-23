"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  X, 
  Plus, 
  Users,
  FolderOpen,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface CreateProjectWizardProps {
  userId: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface KeyDate {
  id: string;
  label: string;
  date: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function CreateProjectWizard({ userId }: CreateProjectWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectCode: '',
    researchQuestion: '',
    keyDates: [] as KeyDate[],
    teamMembers: [] as TeamMember[],
    contextualFiles: [] as UploadedFile[],
    uploadedDocument: null as UploadedFile | null,
  });

  // Step 2 states
  const [documentAnalyzing, setDocumentAnalyzing] = useState(false);
  const [showExtractedData, setShowExtractedData] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);

  // Step 3 states
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Step 4 states
  const [uploadingContextual, setUploadingContextual] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    setProjectData({
      projectName: '',
      projectCode: '',
      researchQuestion: '',
      keyDates: [],
      teamMembers: [],
      contextualFiles: [],
      uploadedDocument: null,
    });
    setCurrentStep(1);
    setShowExtractedData(false);
  };

  const updateProjectData = (field: string, value: string | KeyDate[] | TeamMember[] | UploadedFile[] | UploadedFile | null) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Step 2 functions
  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingDocument(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
      };
      
      updateProjectData('uploadedDocument', uploadedFile);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploadingDocument(false);
    }
  };

  const handleUseDemoDocument = () => {
    const demoFile: UploadedFile = {
      id: 'demo',
      name: 'Acme_Corp_UX_Research_SOW.pdf',
      size: 2518425,
      type: 'application/pdf',
    };
    updateProjectData('uploadedDocument', demoFile);
  };

  const handleExtractInformation = async () => {
    setDocumentAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate extracted data
      const extractedQuestion = projectData.uploadedDocument?.name.includes('BoardingPasses') 
        ? "How might we improve the user experience for first-time users of our platform?"
        : "How can we improve the onboarding experience for new enterprise customers?";
      
      const extractedDates: KeyDate[] = projectData.uploadedDocument?.name.includes('BoardingPasses')
        ? [
            { id: '1', label: 'Project Start', date: 'June 15, 2025' },
            { id: '2', label: 'Research Phase', date: 'June 20-30, 2025' },
            { id: '3', label: 'Analysis', date: 'July 1-10, 2025' },
            { id: '4', label: 'Final Deliverable', date: 'July 15, 2025' },
          ]
        : [
            { id: '1', label: 'Project Start', date: 'July 1, 2025' },
            { id: '2', label: 'User Interviews', date: 'July 10-20, 2025' },
            { id: '3', label: 'Analysis Phase', date: 'July 21-31, 2025' },
            { id: '4', label: 'Stakeholder Presentation', date: 'August 10, 2025' },
            { id: '5', label: 'Final Deliverables', date: 'August 15, 2025' },
          ];
      
      updateProjectData('researchQuestion', extractedQuestion);
      updateProjectData('keyDates', extractedDates);
      setShowExtractedData(true);
    } catch (error) {
      console.error('Error extracting information:', error);
    } finally {
      setDocumentAnalyzing(false);
    }
  };

  const addKeyDate = () => {
    const newDate: KeyDate = {
      id: Date.now().toString(),
      label: 'New Date',
      date: '',
    };
    updateProjectData('keyDates', [...projectData.keyDates, newDate]);
  };

  const removeKeyDate = (id: string) => {
    updateProjectData('keyDates', projectData.keyDates.filter(date => date.id !== id));
  };

  const updateKeyDate = (id: string, field: string, value: string) => {
    updateProjectData('keyDates', projectData.keyDates.map(date => 
      date.id === id ? { ...date, [field]: value } : date
    ));
  };

  // Step 3 functions
  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.email && newTeamMember.role) {
      const member: TeamMember = {
        id: Date.now().toString(),
        ...newTeamMember,
      };
      updateProjectData('teamMembers', [...projectData.teamMembers, member]);
      setNewTeamMember({ name: '', email: '', role: '' });
    }
  };

  const removeTeamMember = (id: string) => {
    updateProjectData('teamMembers', projectData.teamMembers.filter(member => member.id !== id));
  };

  // Step 4 functions
  const handleContextualUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingContextual(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newFiles: UploadedFile[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      
      updateProjectData('contextualFiles', [...projectData.contextualFiles, ...newFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploadingContextual(false);
    }
  };

  const removeContextualFile = (id: string) => {
    updateProjectData('contextualFiles', projectData.contextualFiles.filter(file => file.id !== id));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return projectData.projectName.trim() !== '' && projectData.projectCode.trim() !== '';
      case 2:
        return showExtractedData && projectData.researchQuestion.trim() !== '';
      case 3:
      case 4:
        return true; // These steps are optional
      case 5:
        return true; // Review step
      default:
        return true;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCreateProject = async () => {
    // Simulate project creation
    console.log('Creating project with data:', projectData);
    console.log('Project creator userId:', userId);
    
    setCreatingProject(true);
    
    // Simulate API call with delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock project ID
      const projectId = `${Date.now()}`;
      
      // In a real app, you would get the project ID from the API response
      console.log(`Project created with ID: ${projectId}`);
      
      // Redirect to the project page
      window.location.href = `/projects/${projectId}`;
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setCreatingProject(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Project
        </h1>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              Create New Research Project
            </CardTitle>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
            
            {/* Step indicators */}
            <div className="flex items-center space-x-4 mt-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${step === currentStep
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : step < currentStep
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                      }
                    `}
                  >
                    {step < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step}
                  </div>
                  {step < 5 && (
                    <div 
                      className={`
                        w-12 h-0.5 mx-2
                        ${step < currentStep
                          ? 'bg-green-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                        }
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Project Name and Code */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-sm font-medium text-gray-900 dark:text-white">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    placeholder="Enter project name"
                    value={projectData.projectName}
                    onChange={(e) => updateProjectData('projectName', e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectCode" className="text-sm font-medium text-gray-900 dark:text-white">
                    Project Code
                  </Label>
                  <Input
                    id="projectCode"
                    placeholder="e.g., P1234"
                    value={projectData.projectCode}
                    onChange={(e) => updateProjectData('projectCode', e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    A unique identifier for this project
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Upload Statement of Work */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Statement of Work
                  </h3>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        Document Analysis
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Upload your statement of work document to automatically extract key project information like research questions and timelines.
                      </p>

                      {!projectData.uploadedDocument && (
                        <>
                          {/* Upload Area */}
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-4">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <div className="space-y-2">
                              <input
                                type="file"
                                id="sow-upload"
                                className="hidden"
                                onChange={handleDocumentUpload}
                                accept=".pdf,.doc,.docx"
                                disabled={uploadingDocument}
                              />
                              <label htmlFor="sow-upload">
                                <Button 
                                  asChild
                                  variant="link" 
                                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                                  disabled={uploadingDocument}
                                >
                                  <span>
                                    {uploadingDocument ? 'Uploading...' : 'Upload a file'}
                                  </span>
                                </Button>
                              </label>
                              <span className="text-gray-500 dark:text-gray-400"> or drag and drop</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              PDF, DOC, or DOCX up to 10MB
                            </p>
                          </div>

                          {/* Demo Option */}
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              For demo purposes
                            </p>
                            <Button
                              variant="outline"
                              onClick={handleUseDemoDocument}
                              className="border-gray-300 dark:border-gray-600"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Use Demo Statement of Work
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Uploaded Document */}
                      {projectData.uploadedDocument && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {projectData.uploadedDocument.name}
                              </p>
                              <p className="text-sm text-blue-600">
                                {formatFileSize(projectData.uploadedDocument.size)}
                                {projectData.uploadedDocument.id === 'demo' && (
                                  <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                                    Demo Document
                                  </span>
                                )}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateProjectData('uploadedDocument', null)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          {!showExtractedData && (
                            <Button
                              onClick={handleExtractInformation}
                              disabled={documentAnalyzing}
                              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                            >
                              {documentAnalyzing ? 'Extracting Information...' : 'Extract Information'}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Extracted Information */}
                {showExtractedData && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-900 dark:text-white">
                        Extracted Research Question:
                      </Label>
                      <Textarea
                        value={projectData.researchQuestion}
                        onChange={(e) => updateProjectData('researchQuestion', e.target.value)}
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 min-h-[80px]"
                        placeholder="Enter your research question..."
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-900 dark:text-white">
                        Key Dates:
                      </Label>
                      
                      <div className="space-y-2">
                        {projectData.keyDates.map((date) => (
                          <div key={date.id} className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded">
                            <Input
                              value={date.label}
                              onChange={(e) => updateKeyDate(date.id, 'label', e.target.value)}
                              placeholder="Date label"
                              className="flex-1"
                            />
                            <Input
                              value={date.date}
                              onChange={(e) => updateKeyDate(date.id, 'date', e.target.value)}
                              placeholder="Date"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeKeyDate(date.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={addKeyDate}
                        className="w-full border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Date
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Project Team */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Project Team
                  </h3>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={handleNext}
                  >
                    Skip for now
                  </Button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        Collaborate with your team
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add team members to collaborate on this research project. You can always add or remove team members later.
                      </p>

                      {/* Add Team Member Form */}
                      <div className="space-y-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Add Team Member
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400">Name</Label>
                            <Input
                              placeholder="Enter name"
                              value={newTeamMember.name}
                              onChange={(e) => setNewTeamMember(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400">Email</Label>
                            <Input
                              placeholder="Enter email"
                              type="email"
                              value={newTeamMember.email}
                              onChange={(e) => setNewTeamMember(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400">Role</Label>
                            <Select value={newTeamMember.role} onValueChange={(value) => setNewTeamMember(prev => ({ ...prev, role: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="researcher">Researcher</SelectItem>
                                <SelectItem value="analyst">Analyst</SelectItem>
                                <SelectItem value="designer">Designer</SelectItem>
                                <SelectItem value="project-manager">Project Manager</SelectItem>
                                <SelectItem value="stakeholder">Stakeholder</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button
                          onClick={addTeamMember}
                          disabled={!newTeamMember.name || !newTeamMember.email || !newTeamMember.role}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Add Team Member
                        </Button>
                      </div>

                      {/* Team Members List */}
                      {projectData.teamMembers.length > 0 && (
                        <div className="mt-6 space-y-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Team Members ({projectData.teamMembers.length})
                          </div>
                          {projectData.teamMembers.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{member.email} • {member.role}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTeamMember(member.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contextual Resources */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Contextual Resources
                  </h3>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={handleNext}
                  >
                    Skip for now
                  </Button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FolderOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        Optional Resources
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Upload any contextual documents that might be helpful for the project. You can always add more resources later.
                      </p>

                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-4">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <input
                            type="file"
                            id="contextual-upload"
                            className="hidden"
                            onChange={handleContextualUpload}
                            multiple
                            accept=".pdf,.doc,.docx"
                            disabled={uploadingContextual}
                          />
                          <label htmlFor="contextual-upload">
                            <Button 
                              asChild
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700 cursor-pointer"
                              disabled={uploadingContextual}
                            >
                              <span>
                                {uploadingContextual ? 'Uploading...' : 'Upload files'}
                              </span>
                            </Button>
                          </label>
                          <span className="text-gray-500 dark:text-gray-400"> or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          PDF, DOC, or DOCX up to 10MB each
                        </p>
                      </div>

                      {/* Uploaded Files */}
                      {projectData.contextualFiles.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Uploaded Files ({projectData.contextualFiles.length})
                          </div>
                          {projectData.contextualFiles.map((file) => (
                            <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                              <FileText className="w-5 h-5 text-gray-600" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeContextualFile(file.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review and Create */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Review and Create Project
                </h3>

                <div className="space-y-4">
                  {/* Project Details */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {projectData.projectName}</div>
                      <div><span className="font-medium">Code:</span> {projectData.projectCode}</div>
                      {projectData.researchQuestion && (
                        <div><span className="font-medium">Research Question:</span> {projectData.researchQuestion}</div>
                      )}
                    </div>
                  </div>

                  {/* Key Dates */}
                  {projectData.keyDates.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Dates ({projectData.keyDates.length})</h4>
                      <div className="space-y-1 text-sm">
                        {projectData.keyDates.map((date) => (
                          <div key={date.id}><span className="font-medium">{date.label}:</span> {date.date}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Members */}
                  {projectData.teamMembers.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Team Members ({projectData.teamMembers.length})</h4>
                      <div className="space-y-1 text-sm">
                        {projectData.teamMembers.map((member) => (
                          <div key={member.id}>{member.name} ({member.email}) - {member.role}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Files */}
                  {(projectData.uploadedDocument || projectData.contextualFiles.length > 0) && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Uploaded Files</h4>
                      <div className="space-y-1 text-sm">
                        {projectData.uploadedDocument && (
                          <div><span className="font-medium">Statement of Work:</span> {projectData.uploadedDocument.name}</div>
                        )}
                        {projectData.contextualFiles.map((file) => (
                          <div key={file.id}><span className="font-medium">Resource:</span> {file.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>

              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={currentStep === totalSteps ? handleCreateProject : handleNext}
                  disabled={!canProceed() || creatingProject}
                  className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingProject ? 'Creating Project...' : currentStep === totalSteps ? 'Create Project' : 'Next'}
                  {currentStep < totalSteps && !creatingProject && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 