import { NextResponse } from 'next/server';
import { connectToMongoose } from '@/lib/mongodb';
import { Project, Company } from '@/lib/models';

async function seedDatabase() {
  await connectToMongoose();

  // Clear existing data
  await Project.deleteMany({});
  await Company.deleteMany({});

  // Create sample companies
  const companies = await Company.create([
    { name: 'TechWorkspaces Inc.' },
    { name: 'HealthPlus Medical Group' },
    { name: 'FinServe Solutions' },
    { name: 'EcoRetail Brands' },
  ]);

  // Create sample projects
  const sampleProjects = [
    {
      title: 'Remote Work Preferences Study',
      description: 'Understanding employee preferences for remote vs. hybrid work arrangements',
      projectId: 'P001',
      status: 'In Progress',
      company: companies[0]._id,
      createdBy: 'sample_user_1',
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      title: 'Collaboration Tool Usability',
      description: 'Evaluating the effectiveness of different collaboration platforms',
      projectId: 'P002',
      status: 'Planning',
      company: companies[0]._id,
      createdBy: 'sample_user_2',
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      title: 'Office Space Redesign Feedback',
      description: 'Gathering feedback on proposed office layout changes',
      projectId: 'P003',
      status: 'Completed',
      company: companies[0]._id,
      createdBy: 'sample_user_1',
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    },
    {
      title: 'Patient Portal Usability Study',
      description: 'Improving the user experience of our patient portal',
      projectId: 'P2001',
      status: 'In Progress',
      company: companies[1]._id,
      createdBy: 'sample_user_1',
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      title: 'Telehealth Experience Research',
      description: 'Analyzing patient satisfaction with virtual appointments',
      projectId: 'P2002',
      status: 'Completed',
      company: companies[1]._id,
      createdBy: 'sample_user_3',
      updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    },
    {
      title: 'Financial App User Research',
      description: 'Understanding user behavior and pain points in our mobile app',
      projectId: 'P3001',
      status: 'In Progress',
      company: companies[2]._id,
      createdBy: 'sample_user_1',
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    },
    {
      title: 'Sustainable Shopping Experience',
      description: 'Research into eco-friendly shopping preferences',
      projectId: 'F4001',
      status: 'Archived',
      company: companies[3]._id,
      createdBy: 'sample_user_2',
      updatedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    },
    {
      title: 'In-Store Digital Experience',
      description: 'Improving the integration of digital tools in physical stores',
      projectId: 'F4002',
      status: 'Archived',
      company: companies[3]._id,
      createdBy: 'sample_user_3',
      updatedAt: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000), // 9 months ago
    },
  ];

  await Project.create(sampleProjects);

  return {
    success: true,
    message: 'Sample data created successfully',
    companies: companies.length,
    projects: sampleProjects.length,
  };
}

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 