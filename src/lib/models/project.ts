import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logo?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument extends Document {
  filename: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface IProject extends Document {
  title: string;
  description?: string;
  projectId: string; // P001, P002, etc.
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived' | 'On Hold';
  progress: number; // 0-100
  company: mongoose.Types.ObjectId;
  assignedUsers: mongoose.Types.ObjectId[];
  createdBy: string; // Clerk user ID
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  startDate?: Date;
  tags?: string[];
  
  // New fields for enhanced project management
  projectType?: string;
  researchGoals?: string[];
  researchQuestions?: string[];
  teamMembers?: Array<{
    userId: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  }>;
  statementOfWork?: {
    title: string;
    description: string;
    documents: mongoose.Types.ObjectId[];
  };
  clientInfo?: {
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
  };
}

const DocumentSchema = new Schema<IDocument>({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'Archived', 'On Hold'],
    default: 'Planning',
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  assignedUsers: [{
    type: String, // Clerk user IDs
  }],
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
  startDate: Date,
  tags: [String],
  
  // Enhanced fields
  projectType: String,
  researchGoals: [String],
  researchQuestions: [String],
  teamMembers: [{
    userId: String,
    name: String,
    email: String,
    role: String,
    avatar: String,
  }],
  statementOfWork: {
    title: String,
    description: String,
    documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document',
    }],
  },
  clientInfo: {
    name: String,
    contactPerson: String,
    email: String,
    phone: String,
  },
});

// Add indexes for better query performance
ProjectSchema.index({ createdBy: 1 });
ProjectSchema.index({ company: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ projectId: 1 });
DocumentSchema.index({ uploadedBy: 1 });

// Update the updatedAt field on save
ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

CompanySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export const ProjectDocument = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema); 