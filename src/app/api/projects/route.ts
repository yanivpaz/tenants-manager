import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToMongoose } from '@/lib/mongodb';
import { Project, Company } from '@/lib/models';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToMongoose();

    // Get user's projects
    const myProjects = await Project.find({ createdBy: userId })
      .populate('company', 'name')
      .sort({ updatedAt: -1 })
      .lean();

    // Get all projects grouped by company
    const allProjectsRaw = await Project.find({})
      .populate('company', 'name')
      .sort({ updatedAt: -1 })
      .lean();

    // Group projects by company
    const companiesMap = new Map();
    
    for (const project of allProjectsRaw) {
      const companyId = project.company._id.toString();
      const companyName = project.company.name;
      
      if (!companiesMap.has(companyId)) {
        companiesMap.set(companyId, {
          _id: companyId,
          name: companyName,
          projects: []
        });
      }
      
      companiesMap.get(companyId).projects.push(project);
    }

    const allProjects = Array.from(companiesMap.values());

    return NextResponse.json({
      success: true,
      myProjects,
      allProjects
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, company: companyName, status } = body;

    if (!title || !companyName) {
      return NextResponse.json(
        { success: false, error: 'Title and company are required' },
        { status: 400 }
      );
    }

    await connectToMongoose();

    // Find or create company
    let company = await Company.findOne({ name: companyName });
    if (!company) {
      company = await Company.create({ name: companyName });
    }

    // Generate project ID
    const projectCount = await Project.countDocuments();
    const projectId = `P${String(projectCount + 1).padStart(3, '0')}`;

    // Create project
    const project = await Project.create({
      title,
      description,
      projectId,
      status,
      company: company._id,
      createdBy: userId,
    });

    // Populate company data
    await project.populate('company', 'name');

    return NextResponse.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 