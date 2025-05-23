"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Calendar, 
  FileText, 
  Target, 
  HelpCircle, 
  Users, 
  Download, 
  Eye, 
  Trash2, 
  Plus,
  Mail,
  UserPlus
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  projectId: string;
  description: string;
  company: {
    _id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  projectType: string;
  researchGoals: string[];
  researchQuestions: string[];
  teamMembers: Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  }>;
  statementOfWork?: {
    title: string;
    description: string;
    documents: Array<{
      _id: string;
      filename: string;
      originalName: string;
      uploadedAt: string;
    }>;
  };
}

interface ProjectSetupProps {
  project: Project;
}

export function ProjectSetup({ project }: ProjectSetupProps) {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleDocumentAction = (action: 'view' | 'download' | 'delete', documentId: string) => {
    console.log(`${action} document:`, documentId);
    // TODO: Implement document actions
  };

  const handleInviteTeamMember = () => {
    if (inviteEmail) {
      console.log('Inviting:', inviteEmail);
      // TODO: Implement team member invitation
      setInviteEmail('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Project Details Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            Project Details
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Basic information about the project
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Client
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 font-medium">
                  {project.company.name}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  Project Type
                </label>
                <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1">
                  {project.projectType}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                  {project.startDate}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  Project ID
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 font-mono bg-gray-100 dark:bg-gray-700/50 px-3 py-2 rounded-lg w-fit font-semibold">
                  {project.projectId}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  End Date
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                  {project.endDate}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statement of Work Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-600" />
            Statement of Work
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Project scope and contractual agreement
          </p>
        </CardHeader>
        <CardContent>
          {project.statementOfWork?.documents && project.statementOfWork.documents.length > 0 ? (
            <div className="space-y-4">
              {project.statementOfWork.documents.map((doc) => (
                <div key={doc._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {doc.originalName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentAction('view', doc._id)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentAction('download', doc._id)}
                      className="hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentAction('delete', doc._id)}
                      className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No documents uploaded yet
              </p>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Research Goals Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <Target className="w-6 h-6 text-green-600" />
            Research Goals
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400">
            What we aim to achieve
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.researchGoals.map((goal, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800/30">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                  {index + 1}
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Questions Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-orange-600" />
            Research Questions
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Questions we seek to answer
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.researchQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                  Q{index + 1}
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Team Card */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-600" />
            Project Team
          </CardTitle>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Team members and collaboration
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.teamMembers.map((member) => (
              <div key={member._id} className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-200 dark:border-indigo-800/30">
                <Avatar className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <AvatarFallback className="text-white font-bold">
                    {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Invite Team Members */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Invite Team Members
            </h4>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="bg-white dark:bg-gray-800"
                />
              </div>
              <Button onClick={handleInviteTeamMember} disabled={!inviteEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 