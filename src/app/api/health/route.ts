import { NextResponse } from 'next/server';
import { connectToMongoose } from '@/lib/mongodb';
import { System } from '@/lib/models';

// Get version from a constant instead of importing package.json
const APP_VERSION = '0.1.0';

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToMongoose();
    
    // Check if we can read/write to the database
    const systemCheck = await System.findOneAndUpdate(
      { name: 'api' },
      { 
        status: 'healthy', 
        lastChecked: new Date(),
        version: APP_VERSION
      },
      { upsert: true, new: true }
    );

    // Return successful response
    return NextResponse.json({
      status: 'success',
      message: 'Health check passed',
      database: {
        status: systemCheck.status,
        lastChecked: systemCheck.lastChecked,
      },
      version: APP_VERSION,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    // Return error response
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 