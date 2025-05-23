import { NextResponse } from 'next/server';
import { connectToDatabase, connectToMongoose } from '@/lib/mongodb';
import { Db } from 'mongodb';

export async function GET() {
  try {
    // Test both connection methods
    const mongoose = await connectToMongoose();
    const { db } = await connectToDatabase();
    
    // Ensure db is a MongoDB Db instance
    const mongoDb = db as Db;
    
    // Get MongoDB server info and stats
    const serverInfo = await mongoDb.command({ serverStatus: 1 });
    const dbStats = await mongoDb.stats();
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection successful',
      connectionType: 'both',
      mongooseConnection: {
        readyState: mongoose.readyState,
        name: mongoose.name,
        host: mongoose.host,
        models: Object.keys(mongoose.models),
      },
      serverInfo: {
        version: serverInfo.version,
        uptime: serverInfo.uptime,
        connections: serverInfo.connections?.current,
      },
      dbStats: {
        db: dbStats.db,
        collections: dbStats.collections,
        indexes: dbStats.indexes,
        avgObjSize: dbStats.avgObjSize,
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 